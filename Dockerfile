FROM node:lts-alpine3.17 as deps
WORKDIR /app
COPY package.json .
RUN yarn install --frozen-lockfile

FROM node:lts-alpine3.17 as dist
WORKDIR /app
COPY --from=deps ./app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:lts-alpine3.17 as prod
WORKDIR /app
COPY --from=deps ./app/node_modules ./node_modules
COPY --from=dist ./app/dist ./dist
ENV PORT 3000
EXPOSE $PORT

CMD ["node", "dist/main"]
