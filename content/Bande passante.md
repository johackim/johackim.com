---
datePublished: 2021-08-01T21:31
dateUpdated: 2021-08-01T21:31
permalink: limiter-la-bande-passante-dune-interface-reseau-sous-linux
title: Limiter la bande passante d'une interface réseau sous Linux
publish: true
rss: true
aliases:
  - Wondershaper
---

Pour limiter la bande passante d'une interface réseau sous [[Linux]] il existe [wondershaper](https://github.com/magnific0/wondershaper).

## Installation

Pour l'installer sur Debian ou Ubuntu :

```bash
apt install -y wondershaper
```

Pour l'installer sur Arch Linux :

```bash
yay -S --noconfirm wondershaper-git
```

## Limiter la bande passante

Pour limiter le téléchargement de l'interface enp1s0 à 512kbps :

```bash
sudo wondershaper -a enp1s0 -d 512
```

Pour limiter l'upload à 512kbps :

```bash
sudo wondershaper -a enp1s0 -u 512
```

Voilà 😀 !

---

Références :

- [[Réseau|Network]]