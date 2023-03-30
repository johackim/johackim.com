# Build

FROM node:18 AS build

ENV NEXT_TELEMETRY_DISABLED 1

RUN apt update && apt install -y chromium

WORKDIR /app

COPY . /app

RUN curl -o /app/public/install https://raw.githubusercontent.com/johackim/dotfiles/master/.local/bin/install.sh

RUN yarn install

RUN yarn build

RUN rm -rf node_modules

RUN yarn install --prod --ignore-optional

# Production

FROM gcr.io/distroless/nodejs:18

WORKDIR /app

COPY --from=build /app/.next/ ./.next/

COPY --from=build /app/.env ./.env

COPY --from=build /app/public ./public

COPY --from=build /app/lib ./lib

COPY --from=build /app/package.json ./package.json

COPY --from=build /app/node_modules/ ./node_modules/

COPY --from=build /usr/lib/x86_64-linux-gnu/libuuid.so.1 /lib/x86_64-linux-gnu/libuuid.so.1

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
