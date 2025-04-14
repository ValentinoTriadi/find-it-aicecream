FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./

COPY package.json .

RUN pnpm install --frozen-lockfile

RUN npm i -g serve

COPY . .

RUN pnpm run build

EXPOSE 3131

CMD [ "serve", "-s", "dist", "-l", "3131" ]