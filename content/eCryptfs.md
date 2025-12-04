---
datePublished: 2021-06-27T19:19
dateUpdated: 2021-06-27T19:19
title: Chiffrer un dossier avec eCryptfs
permalink: chiffrer-un-dossier-avec-ecryptfs
publish: true
rss: true
description: Guide pour chiffrer un dossier avec eCryptfs sur Ubuntu ou Debian.
note: 54
---

[eCryptfs](https://doc.ubuntu-fr.org/ecryptfs) est un outil pour chiffrer un dossier.

## Installation

Pour l'installer sur Debian ou Ubuntu :

```bash
apt update && apt install -y ecryptfs-utils
```

## Initialisation

Pour initialiser le répertoire `~/.Private` :

```bash
ecryptfs-setup-private
```

## Utilisation

Pour monter le répertoire :

```bash
ecryptfs-mount-private
```

Pour démonter le répertoire :

```bash
ecryptfs-umount-private 
```