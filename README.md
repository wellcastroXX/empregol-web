# empregol. — web

Front-end público do **empregol.com** — a ponte entre atletas sem clube e quem decide a próxima
janela.

Stack: **React 19 · TypeScript · Vite · React Router · TanStack Query · Vitest**.

---

## Começando

```bash
npm install
cp .env.example .env.local   # ajuste VITE_API_URL
npm run dev                  # http://localhost:5173
```

Requer Node **>= 20.19**.

## Scripts

| Script              | O que faz                                   |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento com HMR         |
| `npm run build`     | Typecheck (`tsc -b`) + build de produção    |
| `npm run preview`   | Serve o `dist/` localmente                  |
| `npm run typecheck` | Só a checagem de tipos                      |
| `npm run lint`      | ESLint (`lint:fix` para corrigir)           |
| `npm run format`    | Prettier (`format:check` para só verificar) |
| `npm run test`      | Vitest (`test:watch`, `test:coverage`)      |

## Arquitetura

Organização em camadas, inspirada em _feature-sliced design_. A regra de ouro é a **direção das
dependências**:

```
app  →  pages  →  features  →  shared
```

Uma camada só importa de camadas à sua direita. `shared` nunca importa de `features` ou `pages`.

```
src/
├── app/                      # Composição da aplicação
│   ├── App.tsx               #   raiz: providers + router
│   ├── providers/            #   QueryClientProvider, ErrorBoundary
│   └── router/               #   rotas e lazy loading
├── pages/                    # Uma pasta por rota
│   ├── home/                 #   homepage editorial (empregol.com)
│   │   ├── HomePage.tsx
│   │   └── components/       #   seções exclusivas da home
│   └── not-found/
├── features/                 # Domínio de negócio, reutilizável entre páginas
│   └── athletes/
│       ├── api/              #   acesso a dados (hoje: mock)
│       ├── model/            #   tipos, constantes, regras
│       └── ui/               #   componentes do domínio (FormationPitch)
├── shared/                   # Agnóstico de domínio
│   ├── config/               #   env validado (zod) + tokens do design system
│   ├── layout/               #   SiteHeader, SiteFooter, SiteLayout
│   ├── lib/                  #   apiClient (axios), queryClient
│   └── ui/                   #   primitivos de UI
├── styles/                   # tokens.css (design system) + global.css
├── assets/                   # imagens e SVGs da marca
└── test/                     # setup do Vitest
```

### Convenções

- **Alias `@/`** aponta para `src/` — sem `../../..` nos imports.
- **Páginas usam `export default`** (necessário para `React.lazy`); todo o resto usa exports
  nomeados.
- **Rotas centralizadas** em `src/app/router/routes.ts` — nada de string literal solta.
- **Env validado no boot** em `src/shared/config/env.ts`: variável faltando quebra na hora, não em
  produção.
- **Erros de API normalizados** por `toApiError` em `src/shared/lib/http/api-client.ts`.
- O token de acesso vive **em memória** (`setAccessToken`), não no `localStorage`.

## Design System

Os tokens vêm do **Empregol Design System** (`colors_and_type.css`), copiados para
`src/styles/tokens.css` — cores em português (`--tinta`, `--creme`, `--gramado`, `--osso`, `--giz`,
`--cinza`), escala tipográfica e espaçamento em base 4px.

Para uso em JS/estilos inline os mesmos valores estão tipados em
[`src/shared/config/theme.ts`](src/shared/config/theme.ts) (`colors`, `fonts`). Prefira os tokens a
hex literal.

Fontes (Bricolage Grotesque, Geist, Geist Mono) são carregadas via `<link>` no `index.html`.

## Homepage

A home é a transcrição fiel da superfície **A — Homepage** do UI Kit Web do design system, na ordem:

`Hero · Métricas da semana · Destaque da semana · Vitrine (carrossel) · Formação da semana ·
Histórias · Confiam`

Os dados dos atletas ainda são mock (`src/features/athletes/api/showcase-athletes.mock.ts`) — a
troca pelo endpoint real da `empregol-api` acontece nesse arquivo, sem tocar nos componentes.

## Deploy

Roda no servidor `infra` (192.168.3.197) em `/project/empregol/web`, ao lado do backend. A imagem é
multi-stage (`node:22-alpine` compila → `nginx:alpine` serve), publicada pelo **Traefik** no
entrypoint `web` e exposta pelo **Cloudflare Tunnel** (TLS termina no edge da Cloudflare).

```bash
ssh server@192.168.3.197
cd /project/empregol/web
./scripts/deploy.sh          # git pull + docker compose up -d --build
```

Pontos de atenção:

- `VITE_API_URL` é lida **em tempo de build** — trocar o valor exige rebuild da imagem, não basta
  reiniciar o container.
- O compose usa `name: empregol-web`, separado do `name: empregol` do backend. Um `docker compose
down` aqui não encosta na API nem no banco.
- Hostnames públicos vivem no dashboard do **Cloudflare Zero Trust** (o tunnel roda com `--token`,
  então o `config.yml` local é ignorado). Domínio novo = criar o Public Hostname apontando para
  `http://traefik:80`.
- `/healthz` responde `ok` — use no Uptime Kuma.
