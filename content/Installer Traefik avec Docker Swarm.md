---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: installer-traefik-avec-docker-swarm
publish: true
rss: true
note: 57
---

Pour installer Traefik avec [[Docker Swarm]], on créer une stack Docker `traefik.yml` :

```yaml
# traefik.yml
version: '3.8'

services:
  traefik:
    image: traefik:${VERSION:-2.4.8}
    command:
      - --providers.docker
      - --providers.docker.network=traefik-net
      - --providers.docker.exposedByDefault=false
      - --providers.docker.swarmMode=true
      - --providers.docker.endpoint=unix:///var/run/docker.sock
      - --entrypoints.http.address=:80
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - {target: 80, published: 80, mode: host, protocol: tcp}

networks:
  default:
    external: true
    name: traefik-net
```

On créer un réseau docker :

```bash
docker network create --driver=overlay traefik-net
```

On déploie traefik :

```bash
docker stack deploy -c traefik.yml traefik
```

Il est à présent possible de déployer une application (ex: Ghost) avec un nom de domaine associé (ex: ghost.localhost) :

```bash
docker service create --network traefik-net \
-l traefik.enable=true \
-l traefik.http.routers.my-container.rule='Host(`ghost.localhost`)' \
-l traefik.http.services.my-service.loadbalancer.server.port=2368 ghost
```

Vous pouvez accédez à votre application en vous rendant sur http://ghost.localhost.