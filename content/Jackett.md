---
title: Jackett
permalink: jackett
description: Jackett est un métamoteur de torrents open-source.
datePublished: 2021-05-30T19:50
dateUpdated: 2024-06-22T19:50:00
publish: true
rss: true
note: 71
---

[Jackett](https://github.com/Jackett/Jackett) est un métamoteur de torrents open-source.

Il peut être intégré dans des outils de recherche de torrent comme qBittorrent par exemple.

## Installation

Pour l'installer avec Docker, exécutez la commande suivante :

```bash
docker run -d --name jackett --restart=always --pull always -v ~/.config/jackett/config:/config -v ~/.config/jackett/downloads:/downloads -p 9117:9117 linuxserver/jackett
```

Vous pouvez ensuite vous rendre à l'adresse http://localhost:9117/ pour ajouter des Trackers torrent.

## Utilisation avec Flaresolverr

Vous pouvez aussi paramétrer [[Flaresolverr]] pour contourner la protection de Cloudflare si besoin.

Pour démarrer Flaresolverr avec Jackett, exécutez les commandes suivantes :

```bash
docker network create jackett
docker run -d --name flaresolverr --restart=always --pull always --network jackett -p 8191:8191 -e LOG_LEVEL=info ghcr.io/flaresolverr/flaresolverr:latest
docker run -d --name jackett --restart=always --pull always --network jackett -v ~/.config/jackett/config:/config -v ~/.config/jackett/downloads:/downloads -p 9117:9117 linuxserver/jackett
```

Et renseignez dans http://flaresolverr:8191 dans le paramètre `FlareSolverr API URL` sur Jackett.