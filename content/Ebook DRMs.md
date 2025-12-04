---
title: Comment supprimer les DRMs d'un ebook acheté sur Amazon ?
permalink: comment-supprimer-les-drms-dun-ebook
datePublished: 2020-12-26T08:42
dateUpdated: 2020-12-26T08:42
description: Pour être libre de pouvoir consulter ses ebooks sur n'importe quel support, voici les étapes à suivre pour supprimer les DRMs d'un ebook acheté sur Amazon.
publish: true
note: 68
---

Pour être libre de pouvoir consulter ses ebooks sur n'importe quel support, voici les étapes à suivre pour supprimer les DRMs d'un ebook acheté ou louer gratuitement via Kindle Unlimited sur Amazon.

## 1. Installer Calibre

Actuellement, la version de calibre qui permet de supprimer les DRMs est la version 4.23.

[Téléchargez et installez Calibre en version 4.23](https://download.calibre-ebook.com/4.23.0/) :

```bash
wget https://download.calibre-ebook.com/4.23.0/calibre-4.23.0-x86_64.txz
tar xvf calibre-4.23.0-x86_64.txz
./calibre-debug -g
```

## 2. Installer le plugin DeDRM

La dernière version en date qui fonctionne avec Calibre 4.23 est la version 6.8.1.

[Téléchargez DeDRM plugin v6.8.1](https://github.com/apprenticeharper/DeDRM_tools/releases/tag/v6.8.1).

```bash
wget https://github.com/apprenticeharper/DeDRM_tools/releases/download/v6.8.1/DeDRM_tools_6.8.1.zip
unzip DeDRM_tools_6.8.1.zip
```

Pour l'installer, rendez-vous dans les préférences puis plugins de calibre et uploadez le fichier `DeDRM_Plugin.zip`.

## 3. Ajoutez le numéro de série de votre liseuse Kindle

Dans la configuration du plugin (**elnk Kindle ebooks**), ajoutez le numéro de série de votre kindle.

Vous pouvez retrouver ce numéro dans les paramètres de votre liseuse.

## 4. Téléchargez votre ebook via Amazon

Les ebooks que vous avez achetés ou loués sont accessibles au format awz3 à [cette adresse](https://amazon.fr/hz/mycd/myx#/home/content/pdocs/dateDsc/).

## 5. Convertir son ebook

Une fois votre ebook au format awz3 téléchargé, ajoutez le dans calibre. Le simple fait de l'ajouter dans calibre supprimera le DRM.

Pour vérifier, convertissez votre ebook dans un autre format (ex: epub, mobi, pdf) ou ouvrez le avec un lecteur d'ebook (exemple: Foliate, FBReader, Okular, etc...).

PS : Si votre fichier a une extension .kfx, n'oubliez pas de [télécharger le plugin KFX Input](https://mobileread.com/forums/showthread.php?t=291290).

---

Références :

- https://github.com/noDRM/DeDRM_tools
- https://itsfoss.com/calibre-remove-drm-kindle/