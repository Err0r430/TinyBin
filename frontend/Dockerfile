# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Production stage
FROM node:22-alpine
WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g vite

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy build output
COPY --from=builder /app/.svelte-kit /app/.svelte-kit
COPY --from=builder /app/build /app/build
COPY --from=builder /app/static /app/static
COPY --from=builder /app/src /app/src
COPY --from=builder /app/vite.config.js /app/vite.config.js

EXPOSE 4174

CMD ["pnpm", "vite", "preview", "--host", "0.0.0.0", "--port", "4174"]