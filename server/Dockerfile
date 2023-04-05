FROM node:16-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY --from=development /app/node_modules ./node_modules
COPY . .

RUN npm run build
ENV NODE_ENV production
RUN npm ci --production && npm cache clean --force

FROM node:16-alpine as production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node", "dist/src/main.js" ]
