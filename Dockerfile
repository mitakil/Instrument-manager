FROM node:24-bookworm-slim AS frontend-build

WORKDIR /usr/src/app

COPY --chown=node:node frontend/package*.json ./

RUN npm ci

COPY --chown=node:node frontend/ .

RUN npm run build

FROM node:24-bookworm-slim AS backend-build

WORKDIR /usr/src/app

COPY --chown=node:node backend/package*.json ./

ENV NODE_ENV=production

RUN npm ci --omit=dev

COPY --chown=node:node backend/ .

COPY --chown=node:node --from=frontend-build /usr/src/app/dist ./dist

EXPOSE 3000

USER node

CMD ["sh", "-c", "npm run db:migrate:up && npm run db:seed:up && exec node src/index.js"]