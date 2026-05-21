FROM node:22-alpine AS build

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY rollup.config.js ./
COPY ./scripts ./scripts
COPY ./src ./src
COPY ./public ./public

RUN pnpm build


FROM nginx:1.31-alpine-slim

RUN apk add --no-cache bash jq

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /srv/www
COPY ./scripts/generate-config.sh /app/generate-config.sh
COPY ./docker-entrypoint.sh /app/docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]
