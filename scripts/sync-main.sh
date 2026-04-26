#!/usr/bin/env bash
set -euo pipefail

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$BRANCH" == "main" ]]; then
  echo "❌ Você está na main. Troque para sua branch de feature antes de rodar este script."
  exit 1
fi

echo "➡️ Branch atual: $BRANCH"
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "⚠️ Remote 'origin' não configurado neste ambiente."
  echo "   Configure com: git remote add origin <url-do-repo>"
  exit 4
fi

git fetch origin

echo "➡️ Rebase com origin/main"
if ! git rebase origin/main; then
  echo "⚠️ Conflitos detectados. Resolva os arquivos e execute:"
  echo "   git add <arquivos_resolvidos>"
  echo "   git rebase --continue"
  exit 2
fi

echo "➡️ Verificando marcadores de conflito..."
if git grep -nE '^(<<<<<<<|=======|>>>>>>>)' -- . ':(exclude)scripts/sync-main.sh'; then
  echo "❌ Ainda existem marcadores de conflito no código."
  exit 3
fi

echo "✅ Rebase finalizado sem marcadores de conflito."
echo "➡️ Rodar validações locais sugeridas:"
echo "   npm run check:conflicts && npm run lint && npm run typecheck && npm run test && npm run build"
