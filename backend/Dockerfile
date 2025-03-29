FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Run the app
USER bun
EXPOSE 5001/tcp
CMD ["bun", "src/index.ts"]