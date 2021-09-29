FROM node:14-alpine

WORKDIR /app

COPY rollup.config.js ./
COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./docker-entrypoint.sh ./

EXPOSE 5000

ENV HOST=0.0.0.0

ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
CMD [ "npm", "run", "start" ]
