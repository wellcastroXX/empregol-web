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

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost/healthz || exit 1
