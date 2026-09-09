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
] as const;

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
    trecho:
      "A CÂMARA MUNICIPAL DE SÃO JOSÉ DO SABUGI, Estado da Paraíba, por meio da Comissão Organizadora, torna público que realizará Concurso Público para provimento de cargos efetivos e formação de cadastro de reserva do quadro de pessoal da Câmara Municipal, observadas as normas, condições e exigências estabelecidas em Edital e na legislação vigente.",
  },
  {
    id: "araruna-001-2026",
    orgao: "Prefeitura Municipal de Araruna",
    cidade: "Araruna",
    tipo: "concurso",
    esfera: "municipal",
    titulo: "Concurso Público nº 001/2026 — 195 vagas (fundamental, médio/técnico e superior)",
    inscricoesDe: "2026-09-10",
    inscricoesAte: "2026-10-12",
    banca: "CPCon / UEPB",
    data: "2026-09-04",
    edicao: "18.665",
    fonteId: "DOE-PB",
    fonteUrl:
      "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-04-09-2026-portal.pdf",
    trecho:
      "Concurso Público nº 001/2026 – PMA/PB, destinado ao provimento de cargos efetivos do quadro de servidores municipais, com oferta de 195 (cento e noventa e cinco) vagas, para cargos de níveis fundamental, médio/técnico e superior. O certame será executado pela Comissão Permanente de Concursos da Universidade Estadual da Paraíba – CPCon/UEPB. As inscrições serão realizadas no período de 10 de setembro a 12 de outubro.",
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
    trecho:
      "O DIRETOR SUPERINTENDENTE DA FUNDAÇÃO PARAIBANA DE GESTÃO EM SAÚDE – PB SAÚDE, no exercício de suas atribuições legais, e tendo em vista o que consta no Edital de Homologação do Concurso Público nº 004/2024, veiculado no Diário Oficial do Estado (D.O.E) de 09/04/2025, RESOLVE: Convocar os candidatos aprovados no Concurso Público da Fundação Paraibana de Gestão em Saúde (PB SAÚDE), abaixo relacionados, obedecida a ordem de classificação final por emprego, para apresentarem a documentação necessária para a contratação contida no checklist de admissão.",
  },
  {
    id: "pbsaude-06-2026",
    orgao: "Fundação Paraibana de Gestão em Saúde — PB Saúde",
    cidade: "João Pessoa",
    tipo: "convocacao",
    esfera: "estadual",
    titulo: "06º Edital de convocação — Concurso Público nº 003/2024",
    inscricoesDe: null,
    inscricoesAte: null,
    banca: null,
    data: "2026-09-04",
    edicao: "18.665",
    fonteId: "DOE-PB",
    fonteUrl:
      "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-04-09-2026-portal.pdf",
    trecho:
      "O DIRETOR SUPERINTENDENTE DA FUNDAÇÃO PARAIBANA DE GESTÃO EM SAÚDE – PB SAÚDE, no exercício de suas atribuições legais, e tendo em vista o que consta no Edital de Homologação do Concurso Público nº 003/2024, veiculado no Diário Oficial do Estado (D.O.E) de 09/04/2025, RESOLVE: Convocar os candidatos aprovados no Concurso Público da Fundação Paraibana de Gestão em Saúde (PB SAÚDE), abaixo relacionados, obedecida a ordem de classificação final por emprego, para apresentarem a documentação necessária para a contratação contida no checklist de admissão.",
  },
  {
    id: "aroeiras-conv-01-2026",
    orgao: "Prefeitura Municipal de Aroeiras",
    cidade: "Aroeiras",
    tipo: "convocacao",
    esfera: "municipal",
    titulo: "2º Edital de convocação de aprovados — Concurso Público nº 01/2026",
    inscricoesDe: null,
    inscricoesAte: null,
    banca: null,
    data: "2026-09-05",
    edicao: "18.666",
    fonteId: "DOE-PB",
    fonteUrl:
      "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-05-09-2026-portal.pdf",
    trecho:
      "O PREFEITO CONSTITUCIONAL DO MUNICÍPIO DE AROEIRAS, ESTADO DA PARAÍBA, no uso das atribuições que lhe são atribuídas pela Lei Orgânica Municipal, CONVOCA o(s) candidato(s) abaixo relacionado(s), classificado(s) no Concurso Público Municipal regido pelo Edital nº 01/2026, para o comparecimento e apresentação de documentos.",
  },
  {
    id: "secult-0018-2026",
    orgao: "Secretaria de Estado da Cultura",
    cidade: "João Pessoa",
    tipo: "convocacao",
    esfera: "estadual",
    titulo:
      "Edital de chamamento público nº 0018/2026 — 2º remanejamento e convocação de suplência",
    inscricoesDe: null,
    inscricoesAte: null,
    banca: null,
    data: "2026-09-05",
    edicao: "18.666",
    fonteId: "DOE-PB",
    fonteUrl:
      "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-05-09-2026-portal.pdf",
    trecho:
      "EDITAL DE CHAMAMENTO PÚBLICO Nº 0018/2026 PARA SELEÇÃO DE PROPOSTAS DE FORMAÇÃO ARTÍSTICO CULTURAL DE MÉDIA DURAÇÃO PARA SEREM REALIZADAS EM ESCOLAS DA REDE ESTADUAL DE ENSINO DA PARAÍBA - EDITAL ARTE E CULTURA NA EDUCAÇÃO EM TEMPO INTEGRAL. 2º REMANEJAMENTO E CONVOCAÇÃO DE SUPLÊNCIA. O Governo do Estado da Paraíba, por meio da Secretaria de Estado da Cultura.",
  },
  {
    id: "secult-023-2026",
    orgao: "Secretaria de Estado da Cultura",
    cidade: "João Pessoa",
    tipo: "convocacao",
    esfera: "estadual",
    titulo:
      "Chamamento nº 023/2026 — ICMS Cultural: desclassificação e convocação de suplentes",
    inscricoesDe: null,
    inscricoesAte: null,
    banca: null,
    data: "2026-09-03",
    edicao: "18.664",
    fonteId: "DOE-PB",
    fonteUrl:
      "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-03-09-2026-portal.pdf",
    trecho:
      "EDITAL DE CHAMAMENTO PÚBLICO Nº 023/2026 PARA SELEÇÃO DE PROJETOS ARTÍSTICOS-CULTURAIS NO ÂMBITO DO PROGRAMA ICMS CULTURAL E PATRIMONIAL \u201cEDITAL AÇÕES E PROJETOS\u201d. DESCLASSIFICAÇÃO DE PROJETOS E CONVOCAÇÃO DE SUPLENTES. O Governo do Estado da Paraíba, por meio da Secretaria de Estado da Cultura.",
  },
  {
    id: "pianco-013-2026",
    orgao: "Prefeitura Municipal de Piancó",
    cidade: "Piancó",
    tipo: "selecao",
    esfera: "municipal",
    titulo: "Chamamento público nº 013/2026 — inscrição de profissionais para sorteio",
    inscricoesDe: "2026-09-04",
    inscricoesAte: "2026-09-04",
    banca: null,
    data: "2026-09-03",
    edicao: "18.664",
    fonteId: "DOE-PB",
    fonteUrl:
      "https://auniao.pb.gov.br/servicos/doe/2026/setembro/diario-oficial-03-09-2026-portal.pdf",
    trecho:
      "A Prefeitura de Piancó torna público, por intermédio da Agente de Contratação e Equipe de Apoio, o CHAMAMENTO PÚBLICO nº 013/2026 a partir do dia 04 de setembro de 2026, das 08:00 às 12:00 horas, com o objeto Chamamento Público para inscrição de profissionais interessados em participar do sorteio.",
  },
] as const;
