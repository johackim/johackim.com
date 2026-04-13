---
title: Téléchargez vos livres Kindle
permalink: exporter-ses-livres-kindle
datePublished: 2025-02-20T13:16:29
dateUpdated: 2025-02-27T13:16:29
aliases:
  - Télécharger ses livres Kindle
publish: true
rss: true
---

À compter du 26 février 2025, l’option « Télécharger et transférer via USB » sur Amazon ne sera plus disponible pour les livres Kindle.

> [!NOTE]
> Ne fonctionne plus depuis le 27 février 2025, cela donne une erreur "No valid download URL found".

Si vous avez de nombreux livres et que vous souhaitez les télécharger sans devoir le faire manuellement, il existe l'outil [amazon-kindle-bulk-downloader](https://github.com/treetrum/amazon-kindle-bulk-downloader).

## Installation

Pour l'installer, il faut avoir [bun](https://bun.sh/) :

```bash
curl -fsSL https://bun.sh/install | bash
```

Puis cloner [le dépôt](https://github.com/treetrum/amazon-kindle-bulk-downloader) :

```bash
git clone https://github.com/treetrum/amazon-kindle-bulk-downloader
```

Installer les dépendances :

```bash
bun install
```

## Utilisation

Créer un fichier `.env` à la racine du projet avec les informations suivantes :

```bash
AMAZON_USER="votre-email"
PASSWORD="votre-mot-de-passe"
```

Puis lancer la commande suivante :

```bash
bun run start --baseUrl "https://www.amazon.fr"
```

Les livres seront téléchargés automatiquement dans le dossier `downloads` 🙂

Et si vous souhaitez supprimer les DRMs de vos livres, j'ai rédigé [[Ebook DRMs|un tutoriel]].