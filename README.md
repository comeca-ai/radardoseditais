# Radar dos Editais — Worker Cloudflare

Leitura diária do Diário Oficial do Estado da Paraíba (A União).

**Ao vivo:** https://radar-dos-editais.jhonata-emerick.workers.dev

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

Cada push em `main` dispara o Action **Deploy Worker**.

Secrets do repositório (Settings → Secrets and variables → Actions), para o Action continuar publicando sozinho:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Não coloque o token no código. KV é opcional: sem o binding o cron e as rotas funcionam; só não persiste o último ingest.
