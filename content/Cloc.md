---
title: Cloc
permalink: cloc
description: Compter le nombre de lignes d'un projet GitHub ou d'un dossier qui contient des fichiers textes.
datePublished: 2024-01-08T10:00:00
dateUpdated: 2024-01-08T10:00:00
publish: true
rss: true
---

Pour compter le nombre de lignes d'un projet GitHub ou simplement d'un dossier qui contient des fichiers textes, il existe un outil en ligne de commande nommé `cloc`.

## Installation

Pour l'installer, il faut utiliser le gestionnaire de paquets `npm` :

```bash
npm i -g cloc
```

## Utilisation

Pour l'utiliser, il faut se placer à la racine de votre projet (ex: https://github.com/ethibox/ethibox) et exécuter la commande suivante :

```bash
cloc .
```

Cela vous donnera un résultat de ce type :

```txt
github.com/AlDanial/cloc v 1.98  T=0.11 s (676.3 files/s, 76874.7 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JSON                             6              0              0           3463
JavaScript                      54            665              3           3100
Text                             1            121              0            553
Markdown                         6             66              0            153
YAML                             3             15              0             64
SVG                              1              1              0             43
Dockerfile                       1             18              0             22
CSS                              1              2              0              9
-------------------------------------------------------------------------------
SUM:                            73            888              3           7407
-------------------------------------------------------------------------------
```

---

Références :

- https://github.com/AlDanial/cloc
- https://github.com/XAMPPRocky/tokei
- https://mobileread.com/forums/showthread.php?t=134000
- [[Programmation]]