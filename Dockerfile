# 1. Swap from node:24-alpine to node:24-slim (Debian)
FROM node:24-slim AS base

# 2. Setup the deps stage using standard Debian architecture
FROM base AS deps
WORKDIR /app

# Copy package managers
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Clean build variable flag for sharp
RUN npm install --ignore-scripts --legacy-peer-deps && npm cache clean --force
# 3. Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Payload requires production env vars or dummy strings during build
ENV NODE_ENV production

ENV NODE_ENV=production

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 4. Production image runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Set up local directories
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]