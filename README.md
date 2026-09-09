# Radar dos Editais — Worker Cloudflare

**App ao vivo:** https://radar-dos-editais.jhonata-emerick.workers.dev

Radar de concursos e convocações lidos no Diário Oficial do Estado da Paraíba. A raiz abre o aplicativo (não JSON).

- Cron `0 9 * * 1-6` UTC — 06:00 em João Pessoa, segunda a sábado
- DOE-PB: PDF do dia, texto nativo
- DOM-JP: o site da prefeitura bloqueia (403) — a falha aparece no radar
- Conta / alertas no KV `RADAR`

| Rota | O quê |
|---|---|
| `/` | Aplicativo (radar, ficha, login, alertas, conta) |
| `GET /api/editais` | Catálogo |
| `GET /api/fontes` | Saúde das fontes |
| `GET /api/ingest` | Lê o DOE agora |
| `GET /health` | Liveness |
