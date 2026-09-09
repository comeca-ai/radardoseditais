import { EDITAIS, FONTES } from "./catalog";
import { doeUrlFor, probeDoe, probeDomJp } from "./ingest";
import page from "./page.html";

export interface Env {
  RADAR?: KVNamespace;
  ASSETS?: Fetcher;
}

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

const htmlHeaders = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
  pragma: "no-cache",
  expires: "0",
  "x-content-type-options": "nosniff",
  "x-radar": "jornal",
};

type IngestResult = {
  at: string;
  doeUrl: string;
  doe: { ok: boolean; status: number; bytes: number | null };
  domJp: { ok: boolean; status: number };
};

type User = {
  email: string;
  salt: string;
  hash: string;
  cidade: string;
  whatsapp: string | null;
};

type Alert = { id: number; cidade: string; tipo: string; enabled: boolean };

async function runIngest(env: Env): Promise<IngestResult> {
  const doeUrl = doeUrlFor();
  const [doe, domJp] = await Promise.all([probeDoe(doeUrl), probeDomJp()]);
  const result: IngestResult = {
    at: new Date().toISOString(),
    doeUrl,
    doe,
    domJp,
  };
  await env.RADAR?.put("last-ingest", JSON.stringify(result));
  return result;
}

function json(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...jsonHeaders, ...extra },
  });
}

function cookie(sid: string, maxAge: number) {
  const parts = [
    `radar_sess=${sid}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  return parts.join("; ");
}

async function pbkdf2(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 80_000, hash: "SHA-256" },
    key,
    256,
  );
  return [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function newId(): string {
  return crypto.randomUUID();
}

function readCookie(request: Request, name: string): string | null {
  const raw = request.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return rest.join("=");
  }
  return null;
}

async function getUser(env: Env, email: string): Promise<User | null> {
  if (!env.RADAR) return null;
  return (await env.RADAR.get(`user:${email.toLowerCase()}`, "json")) as User | null;
}

async function sessionUser(request: Request, env: Env): Promise<User | null> {
  const sid = readCookie(request, "radar_sess");
  if (!sid || !env.RADAR) return null;
  const email = await env.RADAR.get(`sess:${sid}`);
  if (!email) return null;
  return getUser(env, email);
}

function publicUser(u: User) {
  return { email: u.email, cidade: u.cidade, whatsapp: u.whatsapp };
}

async function handleApi(request: Request, env: Env, url: URL): Promise<Response> {
  const path = url.pathname;
  const method = request.method;

  if (path === "/health" && method === "GET") {
    return json({ ok: true, service: "radar-dos-editais", app: "jornal" });
  }

  if (path === "/api/editais" && method === "GET") {
    return json({ data: EDITAIS, total: EDITAIS.length });
  }

  if (path === "/api/fontes" && method === "GET") {
    const last = env.RADAR ? await env.RADAR.get("last-ingest", "json") : null;
    return json({ data: FONTES, ingest: last });
  }

  if (path === "/api/ingest" && (method === "GET" || method === "POST")) {
    const result = await runIngest(env);
    return json(result);
  }

  if (path === "/api/me" && method === "GET") {
    const user = await sessionUser(request, env);
    if (!user) return json({ user: null });
    return json({ user: publicUser(user) });
  }

  if (path === "/api/auth/signup" && method === "POST") {
    if (!env.RADAR) return json({ error: "KV não ligado." }, 500);
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
      cidade?: string;
    };
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");
    const cidade = String(body.cidade || "João Pessoa");
    if (!email.includes("@") || password.length < 8) {
      return json({ error: "E-mail válido e senha com 8 caracteres." }, 400);
    }
    if (await getUser(env, email)) {
      return json({ error: "Já existe conta com este e-mail." }, 409);
    }
    const salt = newId();
    const hash = await pbkdf2(password, salt);
    const user: User = { email, salt, hash, cidade, whatsapp: null };
    await env.RADAR.put(`user:${email}`, JSON.stringify(user));
    const sid = newId();
    await env.RADAR.put(`sess:${sid}`, email, { expirationTtl: 60 * 60 * 24 * 30 });
    return json({ user: publicUser(user) }, 201, { "set-cookie": cookie(sid, 60 * 60 * 24 * 30) });
  }

  if (path === "/api/auth/login" && method === "POST") {
    if (!env.RADAR) return json({ error: "KV não ligado." }, 500);
    const body = (await request.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
    };
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const user = await getUser(env, email);
    if (!user) return json({ error: "E-mail ou senha errados." }, 401);
    const hash = await pbkdf2(String(body.password || ""), user.salt);
    if (hash !== user.hash) return json({ error: "E-mail ou senha errados." }, 401);
    const sid = newId();
    await env.RADAR.put(`sess:${sid}`, email, { expirationTtl: 60 * 60 * 24 * 30 });
    return json({ user: publicUser(user) }, 200, { "set-cookie": cookie(sid, 60 * 60 * 24 * 30) });
  }

  if (path === "/api/auth/logout" && method === "POST") {
    const sid = readCookie(request, "radar_sess");
    if (sid && env.RADAR) await env.RADAR.delete(`sess:${sid}`);
    return json({ ok: true }, 200, { "set-cookie": cookie("deleted", 0) });
  }

  if (path === "/api/profile" && method === "POST") {
    const user = await sessionUser(request, env);
    if (!user || !env.RADAR) return json({ error: "Entre para continuar." }, 401);
    const body = (await request.json().catch(() => ({}))) as {
      cidade?: string;
      whatsapp?: string;
    };
    if (body.cidade) user.cidade = body.cidade;
    if (typeof body.whatsapp === "string") user.whatsapp = body.whatsapp;
    await env.RADAR.put(`user:${user.email}`, JSON.stringify(user));
    return json({ user: publicUser(user) });
  }

  if (path === "/api/alerts" && method === "GET") {
    const user = await sessionUser(request, env);
    if (!user || !env.RADAR) return json({ error: "Entre para continuar." }, 401);
    const rows = ((await env.RADAR.get(`alerts:${user.email}`, "json")) as Alert[] | null) ?? [];
    return json({ data: rows });
  }

  if (path === "/api/alerts" && method === "POST") {
    const user = await sessionUser(request, env);
    if (!user || !env.RADAR) return json({ error: "Entre para continuar." }, 401);
    const body = (await request.json().catch(() => ({}))) as {
      cidade?: string;
      tipo?: string;
      enabled?: boolean;
    };
    const rows = ((await env.RADAR.get(`alerts:${user.email}`, "json")) as Alert[] | null) ?? [];
    const cidade = body.cidade || user.cidade;
    const tipo = body.tipo || "concurso";
    const existing = rows.find((r) => r.cidade === cidade && r.tipo === tipo);
    if (existing) existing.enabled = body.enabled ?? true;
    else rows.push({ id: Date.now(), cidade, tipo, enabled: body.enabled ?? true });
    await env.RADAR.put(`alerts:${user.email}`, JSON.stringify(rows));
    return json({ data: rows });
  }

  if (path === "/api/alerts/toggle" && method === "POST") {
    const user = await sessionUser(request, env);
    if (!user || !env.RADAR) return json({ error: "Entre para continuar." }, 401);
    const body = (await request.json().catch(() => ({}))) as { id?: number; enabled?: boolean };
    const rows = ((await env.RADAR.get(`alerts:${user.email}`, "json")) as Alert[] | null) ?? [];
    const row = rows.find((r) => r.id === body.id);
    if (row) row.enabled = Boolean(body.enabled);
    await env.RADAR.put(`alerts:${user.email}`, JSON.stringify(rows));
    return json({ data: rows });
  }

  return json({ error: "Rota não encontrada" }, 404);
}

function appHtml(): Response {
  return new Response(page, { status: 200, headers: htmlHeaders });
}

export default {
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runIngest(env).then(() => undefined));
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") return new Response(null, { headers: jsonHeaders });
    const url = new URL(request.url);
    const path = url.pathname;
    if (path === "/health" || path.startsWith("/api/")) {
      return handleApi(request, env, url);
    }
    return appHtml();
  },
};
