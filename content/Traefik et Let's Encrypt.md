---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: traefik-et-let's-encrypt
publish: true
rss: true
---

Pour générer des certificats SSL, rien de mieux que Let's Encrypt pour effectuer automatiquement cette tâche.

En rendant publiquement accessible les ports 80 et 443, [[Traefik]] va automatiquement communiquer avec Let's Encrypt pour générer automatiquement des certificats SSL à chaque fois qu'un nouveau nom de domaine est relié à une application.

## Vérifiez que vos ports 80 et 443 sont accessibles publiquement

Avant de lancer Traefik, n'oubliez pas de vérifiez si vos ports 80 et 443 sont bien accessible depuis l'extérieur de votre réseau pour que Let's Encrypt puisse communiquer avec votre serveur Traefik.

Utilisez la commande `curl https://ipv4.am.i.mullvad.net/port/80` (depuis votre serveur) ou https://canyouseeme.org/ pour vérifier.

## Créez une zone DNS de type A

Créez une zone DNS de type A vers l'adresse IP publique de votre serveur, exemple : `ghost.example.com` -> `IN A 9.9.9.9`.

Pour ça, passez par le registraire de votre nom de domaine (ex: [OVH](https://ovh.com/fr/), [Gandi](https://gandi.net/fr), [GoDaddy](https://godaddy.com/fr-fr) ou [1&1](https://www.ionos.fr/domaine/noms-de-domaine)).

## Démarrez Traefik avec Docker Swarm et Let's Encrypt

Démarrez Traefik :

```yaml
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
      - --entrypoints.https.address=:443
      - --entrypoints.http.http.redirections.entryPoint.to=https
      - --entrypoints.http.http.redirections.entryPoint.scheme=https
      - --entrypoints.http.http.redirections.entrypoint.permanent=true
      - --certificatesresolvers.letsencrypt.acme.tlschallenge=true
      - --certificatesresolvers.letsencrypt.acme.email=${ACME_EMAIL:-noreply@ethibox.fr}
      - --certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json
    volumes:
      - ${VOLUME_PATH}letsencrypt:/letsencrypt
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - {target: 80, published: 80, mode: host, protocol: tcp}
      - {target: 443, published: 443, mode: host, protocol: tcp}

volumes:
  letsencrypt:

networks:
  default:
    external: true
    name: traefik-net
```

```bash
docker stack deploy -c traefik.yml traefik
```

Créer une application avec un nom de domaine que vous disposez (ex: ghost.example.com) :

```bash
docker service create --network traefik-net \
-l traefik.enable=true \
-l traefik.http.routers.my-container.rule='Host(`ghost.example.com`)' \
-l traefik.http.services.my-service.loadbalancer.server.port=2368 ghost
```

Un certificat est automatiquement généré et vous pouvez à présent accéder à votre application avec le protocole HTTPS : `https://ghost.example.com`.