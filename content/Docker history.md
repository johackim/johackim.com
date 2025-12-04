---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: inspecter-toutes-les-couches-d'une-image-docker
publish: true
rss: true
aliases:
  - Inspecter toutes les couches d'une image Docker
  - How to get the Dockerfile of a docker image?
note: 48
---

Pour inspecter toutes les couches d'une image [[Docker]], il existe la commande suivante :

```bash
docker history --no-trunc <image>
```

ou

```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock --rm ghcr.io/laniksj/dfimage <image>
```