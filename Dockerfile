FROM node:18-alpine3.15 as deps
WORKDIR /app
COPY package.json .
RUN yarn install --frozen-lockfile

FROM node:18-alpine3.15 as dist
WORKDIR /app
COPY --from=deps ./app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:18-alpine3.15 as prod
WORKDIR /app
COPY --from=deps ./app/node_modules ./node_modules
COPY --from=dist ./app/dist ./dist
EXPOSE 3001

CMD ["node", "dist/main"]
