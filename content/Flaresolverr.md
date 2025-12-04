---
title: Flaresolverr
permalink: contourner-la-protection-cloudflare
datePublished: 2021-05-30T19:50
dateUpdated: 2021-05-30T19:50
aliases:
  - Contourner la protection Cloudflare
publish: true
rss: true
---

[FlareSolverr](https://github.com/FlareSolverr/FlareSolverr) est un serveur proxy pour contourner la protection Cloudflare.

Pour le démarrer avec Docker :

```bash
docker run -p 8191:8191 -e LOG_LEVEL=info ghcr.io/flaresolverr/flaresolverr:latest
```

FlareSolverr peut être personnalisé pour résoudre les captchas automatiquement en définissant la variable d'environnement `CAPTCHA_SOLVER` avec le nom de l'un des resolvers (`hcaptcha-solver` ou `harvester`), exemple :

```bash
docker run -p 8191:8191 -e LOG_LEVEL=info -e CAPTCHA_SOLVER=hcaptcha-solver ghcr.io/flaresolverr/flaresolverr:latest
```

Pour utiliser FlareSolverr, envoyez une requête curl :

```bash
curl -L -X POST 'http://localhost:8191/v1' \
-H 'Content-Type: application/json' \
--data-raw '{
  "cmd": "request.get",
  "url":"http://yggtorrent.li/",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleW...",
  "maxTimeout": 60000
}'
```