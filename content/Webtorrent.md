---
datePublished: 2021-09-16T22:10
dateUpdated: 2021-09-16T22:10
title: Télécharger des torrents depuis un navigateur web
permalink: webtorrent
publish: true
rss: true
note: 56
---

Pour télécharger un torrent depuis un navigateur web, il existe un outil qui s'appelle `webtorrent`.

Depuis un navigateur (Firefox, chrome, etc...), `webtorrent` peut uniquement télécharger des torrents qui sont diffusés par un client torrent compatible avec WebRTC (ex: `webtorrent-hybrid`).

`webtorrent-hybrid` permet de télécharger et partager des torrents depuis WebRTC contrairement à `webtorrent` qui peut télécharger uniquement des torrents depuis des peers traditionnels.

## Installer webtorrent

```bash
npm install -g webtorrent-hybrid
```

## Télécharger un torrent (ou un magnet)

```bash
webtorrent-hybrid download "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10"
```

## Seeder un torrent

```bash
webtorrent-hybrid seed [--torrent-port <port>] <folder|file>
```