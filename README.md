# Server-ia Admin (Next.js 14)

Painel/admin completo em **Next.js 14 + TypeScript** para consumir todos os endpoints do projeto `Server-ia`, pronto para deploy na Vercel.

## Stack
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS + componentes base estilo shadcn/ui
- TanStack Query
- TanStack Table
- React Hook Form + Zod
- Recharts
- EventSource (SSE)
- Vitest + Playwright

## Variáveis de ambiente
Copie `.env.example`:

```bash
cp .env.example .env.local
```

Configure:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:9999
```

## Scripts
```bash
npm install
npm run dev
npm run lint
npm run test
npm run test:e2e
npm run build
npm run start
```

## Rotas da UI
- `/login` autenticação local mock
- `/dashboard` cards e gráfico de atividade
- `/services` tabela + filtro + alternância de status
- `/logs` SSE em tempo real + filtros + export CSV/JSON
- `/users` crédito em carteira + histórico local
- `/games/crash` rodada/aposta/cashout
- `/docs` documentação interativa com botão de teste

## Cobertura de endpoints
- `GET /api/services`
- `POST /api/services/:id/status`
- `POST /api/users/credit`
- `GET /api/stats`
- `POST /api/games/crash/round`
- `POST /api/games/crash/bet`
- `POST /api/games/crash/cashout`
- `GET /api/logs`
- `GET /events` (SSE)

## Fallback / resilência
Se o backend estiver indisponível, o app entra em modo fallback para evitar quebra de UX:
- dados mockados para serviços, stats e logs
- operações de crédito/crash retornam respostas simuladas
- mensagens amigáveis para falha de conexão

## Deploy Vercel (passo a passo)
1. Suba este projeto no GitHub.
2. Na Vercel, clique em **Add New > Project** e selecione o repositório.
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_API_BASE_URL=https://SEU-BACKEND`.
4. Faça deploy.
5. Valide pós-deploy:
   - Acesse `/dashboard` e confira cards.
   - Acesse `/logs` e valide eventos SSE.
   - Teste crédito em `/users` e fluxo crash em `/games/crash`.

## Backend em produção (Render/VPS)
- Aponte `NEXT_PUBLIC_API_BASE_URL` para o host HTTPS do backend.
- Garanta CORS liberando domínio da Vercel.
- Exponha SSE em `/events` com keep-alive.

## Checklist de QA
- [ ] Login redireciona para dashboard.
- [ ] Cards do dashboard carregam corretamente.
- [ ] Tabela de serviços lista e alterna status.
- [ ] Logs atualizam em tempo real via SSE.
- [ ] Export CSV e JSON em logs funcionam.
- [ ] Crédito de usuário registra histórico local.
- [ ] Fluxo crash (rodada -> aposta -> cashout) completo.
- [ ] Docs conseguem testar endpoints.
- [ ] Build e start funcionam sem erro.

## CI
Workflow em `.github/workflows/ci.yml` com:
- lint
- unit tests
- build

## Atualizar branch sem conflitos (GitHub)
Quando a branch estiver desatualizada ou com conflito:

```bash
git checkout sua-branch
git fetch origin
git rebase origin/main
# resolva conflitos nos arquivos, depois:
git add .
git rebase --continue
```

Se preferir merge:

```bash
git checkout sua-branch
git fetch origin
git merge origin/main
```

Antes de abrir PR, rode:

```bash
npm run check:conflicts
npm run lint
npm run typecheck
npm run test
npm run build
```

> Dica: este repositório usa `.gitattributes` com `LF` para reduzir conflitos por quebra de linha.

### Atalho para sincronizar com `main`
Use o script abaixo para reduzir erro manual de conflito:

```bash
./scripts/sync-main.sh
```

Ele faz `fetch`, `rebase origin/main`, verifica marcadores de conflito e lembra os checks finais.
