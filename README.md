# Radar dos Editais — Worker Cloudflare

**Abre o jornal (não JSON):** https://radar-dos-editais.jhonata-emerick.workers.dev/?v=jornal

**PoC integridade SEBRAE/RO (rota nova):** https://radar-dos-editais.jhonata-emerick.workers.dev/integridade

Radar de concursos e convocações lidos no Diário Oficial do Estado da Paraíba. A raiz e qualquer rota que não seja `/api` ou `/integridade` devolvem o jornal.

- Cron `0 9 * * 1-6` UTC — 06:00 em João Pessoa, segunda a sábado
- DOE-PB: PDF do dia, texto nativo
- DOM-JP: o site da prefeitura bloqueia (403) — a falha aparece no radar
- Conta / alertas no KV `RADAR`
- `/integridade` — PoC Fase 1 do TR SEBRAE/RO. Contratos DEMO. Humano decide.

| Rota | O quê |
|---|---|
| `/` `/login` `/alertas` `/conta` | Aplicativo (HTML) |
| `/integridade` | Mesa de integridade (PoC) |
| `/integridade#seguranca` | Lista um a um dos itens de segurança do TR |
| `GET /api/editais` | Catálogo |
| `GET /api/fontes` | Saúde das fontes |
| `GET /api/ingest` | Lê o DOE agora |
| `GET /health` | Liveness |
