---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: traefik
publish: true
rss: true
---

Pour rendre accessible plusieurs applications web à partir d'un seul point d'entrée, il existe Traefik en tant que reverse proxy.

Grâce à Traefik, chaque requête HTTP provenant d'un client web (ex: Firefox, Chrome) sera automatiquement redirigé vers la bonne application.

Vous pouvez l'installer avec Docker avec la commande suivante :

```bash
docker run -p 80:80 \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
traefik:2.4.8 --providers.docker=true
```

Une fois installé vous pouvez relié une application à un nom de domaine (ex: ghost.localhost) :

```bash
docker run -l traefik.http.routers.container.rule='Host(`ghost.localhost`)' ghost
```

Vous pouvez accédez à votre application en vous rendant sur http://ghost.localhost.