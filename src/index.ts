import { EDITAIS, FONTES } from "./catalog";
import { doeUrlFor, probeDoe, probeDomJp } from "./ingest";

export interface Env {
  RADAR?: KVNamespace;
}

const headers = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
  "access-control-allow-headers": "content-type",
};

type IngestResult = {
  at: string;
  doeUrl: string;
  doe: { ok: boolean; status: number; bytes: number | null };
  domJp: { ok: boolean; status: number };
};

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

export default {
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runIngest(env).then(() => undefined));
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") return new Response(null, { headers });
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "radar-dos-editais" }, { headers });
    }

    if (url.pathname === "/api/editais" && request.method === "GET") {
      const ingest = env.RADAR ? await env.RADAR.get("last-ingest", "json") : null;
      return Response.json(
        { data: EDITAIS, total: EDITAIS.length, ingest },
        { headers },
      );
    }

    if (url.pathname === "/api/fontes" && request.method === "GET") {
      const ingest = (env.RADAR
        ? await env.RADAR.get<IngestResult>("last-ingest", "json")
        : null) as IngestResult | null;
      const fontes = FONTES.map((f) => {
        if (f.id === "DOE-PB" && ingest) {
          return { ...f, lastProbe: ingest.doe, url: ingest.doeUrl, probedAt: ingest.at };
        }
        if (f.id === "DOM-JP" && ingest) {
          return { ...f, lastProbe: ingest.domJp, probedAt: ingest.at };
        }
        return f;
      });
      return Response.json({ data: fontes, ingest }, { headers });
    }

    if (url.pathname === "/api/ingest" && request.method === "GET") {
      const result = await runIngest(env);
      return Response.json(result, { headers });
    }

    return Response.json(
      {
        name: "Radar dos Editais",
        recorte: "DOE-PB · João Pessoa",
        routes: ["/health", "/api/editais", "/api/fontes", "/api/ingest"],
        cron: "0 9 * * 1-6 UTC",
      },
      { headers },
    );
  },
};
