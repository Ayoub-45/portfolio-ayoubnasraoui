FROM node:20-slim AS deps

WORKDIR /app

RUN corepack enable

COPY package.json  ./

RUN npm install 

FROM node:22-slim AS builder

WORKDIR /app

RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

RUN npm run build

FROM node:20-slim AS runner

WORKDIR /app

RUN corepack enable

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "start"]