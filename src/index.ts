interface Env {
  // Add D1, R2, or KV bindings here as the catalog grows.
}

const headers = {
  "content-type": "application/json; charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, OPTIONS",
  "access-control-allow-headers": "content-type",
};

const editais = [
  {
    orgao: "ENAP — Concurso Nacional Unificado 2",
    edital: "114/2025",
    esfera: "Federal / Brasil",
    banca: "FGV",
    status: "identificado",
  },
  {
    orgao: "SEPLAD / Secretaria de Educação do Pará",
    edital: "001/2026",
    esfera: "Estadual / PA",
    banca: "FGV",
    status: "identificado",
  },
  {
    orgao: "Ministério Público do Espírito Santo",
    edital: "01/2026",
    esfera: "Estadual / ES",
    banca: "FGV",
    status: "identificado",
  },
  {
    orgao: "Prefeitura de Foz do Iguaçu",
    edital: "01.001/2026",
    esfera: "Municipal / PR",
    banca: "Fundação FAFIPA",
    status: "identificado",
  },
];

export default {
  async fetch(request: Request, _env: Env): Promise<Response> {
    if (request.method === "OPTIONS") return new Response(null, { headers });
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "radar-dos-editais" }, { headers });
    }

    if (url.pathname === "/api/editais" && request.method === "GET") {
      return Response.json({ data: editais, total: editais.length }, { headers });
    }

    return Response.json(
      { name: "Radar dos Editais", message: "Catálogo de editais públicos" },
      { headers },
    );
  },
};
