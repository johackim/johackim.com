# Build

FROM node:16 AS build

ENV NEXT_TELEMETRY_DISABLED 1

RUN apt update && apt install -y chromium

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

# Production

FROM node:16-slim

RUN apt update && apt install -y git curl

WORKDIR /app

COPY --from=build /app/.next/ ./.next/

COPY --from=build /app/.env ./.env

COPY --from=build /app/public ./public

COPY --from=build /app/lib ./lib

COPY --from=build /app/package.json ./package.json

RUN curl -o /app/public/install https://raw.githubusercontent.com/johackim/dotfiles/master/.local/bin/install.sh

RUN yarn install --prod

ENV NODE_ENV=production

EXPOSE 3000

HEALTHCHECK --interval=1m --timeout=30s --retries=3 CMD curl --fail http://localhost:3000 || exit 1

CMD ["npm", "start"]
