# Radar dos Editais — Worker Cloudflare

Leitura diária do Diário Oficial do Estado da Paraíba (A União).

O produto (radar, login, alertas, conta) roda na aplicação web. Este repositório é o **Worker**: cron, probe das fontes e API JSON.

## O que o Worker faz

- **Cron** `0 9 * * 1-6` UTC — 06:00 em João Pessoa, segunda a sábado
- **DOE-PB**: testa o PDF do dia (`diario-oficial-DD-MM-YYYY-portal.pdf`). Texto nativo, sem OCR
- **DOM-JP**: o site da prefeitura bloqueia (403). O Worker **registra a falha** e não inventa edital municipal
- **KV** (opcional, binding `RADAR`): guarda o último ingest

## Rotas

| Rota | O quê |
|---|---|
| `GET /health` | Liveness |
| `GET /api/editais` | Catálogo extraído do DOE (8 atos desta leitura) |
| `GET /api/fontes` | Saúde de DOE-PB e DOM-JP + último probe |
| `GET /api/ingest` | Dispara a leitura agora |

## Publicar

O GitHub Action (`Deploy Worker`) publica em todo push em `main`.

Secrets do repositório (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — token com permissão de Workers
- `CLOUDFLARE_ACCOUNT_ID` — id da conta Cloudflare

Sem esses secrets o Action chega no `wrangler deploy` e para: o código está certo, falta a conta.

KV é opcional. Sem o binding, o cron ainda roda e as rotas respondem; só não persiste o último ingest.
