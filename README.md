# Radar dos Editais

Catálogo rastreável de editais de concursos públicos.

## Desenvolvimento

```sh
npm install
npm run dev
```

Endpoints iniciais:

- `GET /health`
- `GET /api/editais`

## Deploy

Configure `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` no ambiente e execute:

```sh
npm run deploy
```

O token nunca deve ser salvo no repositório.
