FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY rollup.config.js ./
COPY ./src ./src
COPY ./public ./public

RUN npm run build


FROM alpine:3.19

RUN apk add --no-cache bash jq busybox-extras

COPY --from=build /app/public /srv/www
COPY ./scripts/generate-config.sh /app/generate-config.sh
COPY ./docker-entrypoint.sh /app/docker-entrypoint.sh

EXPOSE 5000

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
CMD [ "httpd", "-f", "-v", "-p", "5000", "-h", "/srv/www" ]
