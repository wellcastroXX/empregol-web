# syntax=docker/dockerfile:1

# ---------- build ----------
# Vite injeta as variáveis VITE_* no bundle em tempo de build, então elas
# precisam existir aqui — não adianta passá-las como env do container.
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_APP_NAME=empregol
ARG VITE_API_URL=https://api.empregolstartup.com.br
ENV VITE_APP_NAME=$VITE_APP_NAME \
    VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---------- runtime ----------
FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# 127.0.0.1 e não localhost: o wget do busybox tenta ::1 primeiro e o nginx
# só escuta IPv4, o que deixava o container eternamente unhealthy.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1/healthz || exit 1
