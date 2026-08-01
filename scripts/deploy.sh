#!/usr/bin/env bash
# Redeploy do empregol-web no servidor.
#
#   cd /project/empregol/web && ./scripts/deploy.sh
#
# Puxa a branch main, rebuilda a imagem e sobe o container. A imagem anterior
# continua no disco até o prune, então dá para voltar atrás se algo quebrar.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "ERRO: .env não encontrado. Copie de .env.example e preencha." >&2
  exit 1
fi

echo "==> git pull"
git pull --ff-only origin main

echo "==> build + up"
docker compose up -d --build

echo "==> aguardando healthcheck"
for _ in $(seq 1 30); do
  status=$(docker inspect -f '{{.State.Health.Status}}' empregol-web 2>/dev/null || echo "starting")
  [ "$status" = "healthy" ] && break
  sleep 2
done

echo "==> status: ${status:-desconhecido}"
docker compose ps
