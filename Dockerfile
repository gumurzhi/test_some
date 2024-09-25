ARG NODE_VERSION=22.8.0

FROM node:${NODE_VERSION}-slim AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --omit=dev && \
  mv node_modules prod_node_modules && \
  npm install

COPY . .
RUN npm run seed
RUN npm run build

FROM node:${NODE_VERSION}-slim AS production


WORKDIR /usr/src/app

COPY package.json package-lock.json ./

COPY --from=build --chown=node:node /usr/src/app/prod_node_modules node_modules/
COPY --from=build --chown=node:node /usr/src/app/dist dist/
COPY --from=build --chown=node:node /usr/src/app/database.sqlite3 database.sqlite3

USER node

EXPOSE 3001

CMD [ "node", "dist/server.js" ]
