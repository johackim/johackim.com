---
title: Joal
permalink: joal
description: Augmentez votre ratio sur les sites de torrent avec Joal
datePublished: 2021-05-30T19:50
dateUpdated: 2024-06-22T18:46:00
aliases:
  - Ratio torrent
publish: true
rss: true
note: 87
---

[Joal](https://github.com/anthonyraymond/joal/) est un outil pour augmenter automatiquement son ratio sur les sites de torrent.

> [!NOTE]
> **Utilisez cet outil UNIQUEMENT en cas d'extrême nécessité, car cela nuit au principe de partage.**

Pour l'installer, [téléchargez Joal](https://github.com/anthonyraymond/joal/releases/download/2.1.36/joal.tar.gz) et placer le contenu de l'archive dans votre dossier personnel `~/.config/joal`.

Puis, éditez le fichier `~/.config/joal/config.json` pour y ajouter les paramètres suivants :

```json
{
  "minUploadRate" : 10000,
  "maxUploadRate" : 10000,
  "simultaneousSeed" : 5,
  "client" : "qbittorrent-4.6.0.client",
  "keepTorrentWithZeroLeechers" : false,
  "uploadRatioTarget": -1.0
}
```

Le paramètre `minUploadRate` et `maxUploadRate` définissent le débit d'envoi maximal et minimal en octets par seconde.

Je le configure pour que le débit d'envoi soit de 10 Mo/s.

Pour démarrer Joal, utilisez la commande [[Docker]] suivante :

```bash
docker run -d \
    --name="joal" \
    --restart=always \
    -p 8080:8080 \
    -v ~/.config/joal:/data \
    anthonyraymond/joal \
    --joal-conf="/data" \
    --spring.main.web-environment=true \
    --server.port="8080" \
    --joal.ui.path.prefix="SECRET_PATH" \
    --joal.ui.secret-token="SECRET_TOKEN"
```

Accéder à l'adresse [http://localhost:8080/SECRET_PATH/ui/#/](http://localhost:8080/SECRET_PATH/ui/#/) puis cliquez sur le bouton "Change connection settings" pour renseigner les paramètres suivants :

- Path Prefix -> SECRET_PATH
- Secret Token -> SECRET_TOKEN

Enfin, ajoutez un fichier torrent de tracker à l'aide du bouton "+"  vert en bas à droite et attendez jusqu'à atteindre le ratio qui vous convient.

Privilégiez les torrents avec beaucoup de seeders pour éviter les problèmes.

Pour ceux qui n'aiment pas la ligne de commande et Docker, vous pouvez [télécharger la version Desktop](https://github.com/anthonyraymond/joal-desktop/releases/latest).

Et si Joal ne fonctionne pas pour vous, il existe d'autres alternatives :

- https://github.com/slundi/RatioUp
- https://github.com/ap-pauloafonso/ratio-spoof
- https://github.com/NikolayIT/RatioMaster.NET