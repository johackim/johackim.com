---
permalink: croc
title: Croc
description: Croc est un outil de partage de fichiers open-source en ligne de commande.
datePublished: 2024-02-05T10:00:00
dateUpdated: 2024-02-05T10:00:00
publish: true
rss: true
---

[Croc](https://github.com/schollz/croc) est un outil de partage de fichiers en ligne de commande.

Il permet de partager des fichiers de manière sécurisée et chiffrée.

Il est open-source et disponible pour Windows, macOS, Linux et Android.

C'est très pratique pour partager des fichiers entre plusieurs périphériques.

## Installation

Pour l'installer sur Ubuntu/Debian :

```bash
curl https://getcroc.schollz.com | bash
```

Pour l'installer sur Arch Linux :

```bash
sudo pacman -S croc
```

Sur Windows :

```bash
winget install schollz.croc
```

Sur macOS :

```bash
brew install croc
```

Sur Android :

```bash
pkg install croc
```

## Utilisation

Pour envoyer un fichier, il suffit de taper la commande suivante :

```bash
croc <file>
```

Un code de partage est généré et affiché à l'écran. Il suffit de le communiquer au destinataire.

Pour recevoir un fichier, il suffit de taper la commande suivante :

```bash
croc <code>
```

Toutes les données transférées sont chiffrées de bout en bout.

Seul l'expéditeur et le destinataire peuvent déchiffrer le contenu transféré.

---

Références :

- https://github.com/schollz/croc