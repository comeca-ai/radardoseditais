# Radar dos Editais

Worker Cloudflare: leitura diária do Diário Oficial do Estado da Paraíba (A União).

- Cron: `0 9 * * 1-6` UTC (06:00 em João Pessoa)
- Fonte estadual: PDF do DOE-PB (texto nativo, sem OCR)
- Fonte municipal (DOM-JP): o site da prefeitura bloqueia (403). O Worker registra a falha; não inventa edital.

## Rotas

| Rota | O quê |
|---|---|
| `GET /api/editais` | Catálogo extraído do DOE |
| `GET /api/fontes` | Saúde de DOE-PB e DOM-JP |
| `GET /api/ingest` | Dispara a leitura agora |
| `GET /health` | Liveness |

## Publicar

1. No Cloudflare: `npx wrangler deploy` (conta que já publica este repo).
2. Opcional KV: `npx wrangler kv namespace create RADAR` e cole o id em `wrangler.toml`.
3. GitHub Actions usa `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`.

A interface completa (login, filtros, alertas) roda no app web; este Worker é a leitura diária da fonte oficial.
