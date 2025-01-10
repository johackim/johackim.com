# Build

FROM node:20 AS build

ENV NEXT_TELEMETRY_DISABLED=1

RUN echo 'deb http://deb.debian.org/debian/ sid main contrib non-free' >> /etc/apt/sources.list

RUN apt update && apt install -y chromium

WORKDIR /app

COPY . /app

RUN curl -o /app/public/install https://raw.githubusercontent.com/johackim/dotfiles/master/.local/bin/install.sh

RUN yarn install

RUN npm run obsidian:download

RUN yarn build

RUN cp public/sitemap*.xml out

RUN /bin/bash -c 'for file in out/*.html; do [[ "$file" != "out/index.html" ]] && mv "$file" "${file%.html}"; done'

RUN rm -rf node_modules

RUN yarn install --prod --ignore-optional

# Production

FROM gcr.io/distroless/nodejs20

WORKDIR /app

COPY --from=build /app/out ./

COPY --from=build /app/node_modules/ ./node_modules/

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node_modules/.bin/serve"]
