export const FONTES = [
  {
    id: "DOE-PB",
    nome: "Diário Oficial do Estado da Paraíba (A União)",
    status: "ok",
    edicao: "18.667",
    data: "2026-09-09",
    url: "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-09-09-2026-portal.pdf",
    metodo: "texto nativo do PDF oficial",
  },
  {
    id: "DOM-JP",
    nome: "Diário Oficial do Município de João Pessoa",
    status: "falha",
    motivo: "joaopessoa.pb.gov.br devolveu 403. Sem PDF municipal nesta leitura.",
  },
];

export const EDITAIS = [
  {
    id: "sabugi-01-2026",
    orgao: "Câmara Municipal de São José do Sabugi",
    cidade: "São José do Sabugi",
    tipo: "concurso",
    esfera: "municipal",
    titulo: "Edital 01/2026 — Concurso público para cargos efetivos e cadastro de reserva",
    inscricoesDe: "2026-09-08",
    inscricoesAte: "2026-10-09",
    banca: "FACET Concursos",
    data: "2026-09-05",
    edicao: "18.666",
    fonteId: "DOE-PB",
    fonteUrl:
      "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-05-09-2026-portal.pdf",
  },
  {
    id: "araruna-001-2026",
    orgao: "Prefeitura Municipal de Araruna",
    cidade: "Araruna",
    tipo: "concurso",
    esfera: "municipal",
    titulo: "Concurso Público nº 001/2026 — 195 vagas",
    inscricoesDe: "2026-09-10",
    inscricoesAte: "2026-10-12",
    banca: "CPCon / UEPB",
    data: "2026-09-04",
    edicao: "18.665",
    fonteId: "DOE-PB",
    fonteUrl:
      "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-04-09-2026-portal.pdf",
  },
  {
    id: "pbsaude-07-2026",
    orgao: "Fundação Paraibana de Gestão em Saúde — PB Saúde",
    cidade: "João Pessoa",
    tipo: "convocacao",
    esfera: "estadual",
    titulo: "07º Edital de convocação — Concurso Público nº 004/2024",
    inscricoesDe: null,
    inscricoesAte: null,
    banca: null,
    data: "2026-09-04",
    edicao: "18.665",
    fonteId: "DOE-PB",
    fonteUrl:
      "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-04-09-2026-portal.pdf",
  },
];
