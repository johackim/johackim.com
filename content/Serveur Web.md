---
title: Démarrer un serveur HTTP en ligne de commande
permalink: demarrer-un-serveur-http-en-ligne-de-commande
datePublished: 2021-07-05T16:31
dateUpdated: 2021-07-05T16:31
aliases: [Server HTTP, Web server, Serveur HTTP, Serveur Web]
publish: true
rss: true
---

Il existe plusieurs façons de démarrer un serveur HTTP en ligne de commande.

## Python

```bash
python3 -m http.server 5000
```

## PHP

```bash
php -S 0.0.0.0:5000
```

## Nodejs (http-server)

```bash
npm i -g http-server
http-server -p 5000
```

## Nodejs (serve)

```bash
npm i -g serve
serve
```

## Miniserve

```bash
sudo pacman -S miniserve
miniserve
```

## Webfsd

```bash
yay -S --noconfirm webfs
webfsd -F -p 5000
```

---

Références :

- https://gist.github.com/willurd/5720255
- https://github.com/rejetto/hfs/
- [[Nginx]]
- [[Apache]]