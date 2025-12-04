---
datePublished: 2021-09-27T22:29
dateUpdated: 2021-09-27T22:29
permalink: trouver-des-fichiers-en-double-sur-linux
publish: true
rss: true
aliases:
  - fdupes
---

Pour trouver des fichiers en double sur [[Linux]], il existe la commande suivante :

```bash
fdupes -r <dossier>
```

Cette commande va chercher de manière récursive les fichiers qui ont le même contenu.

Pour supprimer les doublons :

```bash
fdupes -rnd <dossier>
```

Et si vous voulez uniquement lister les fichiers qui retournent le même nom de fichier, exécutez cette commande :

```bash
find . -type f -printf '%p/ %f\n' | sort -k2 | uniq -f1 --all-repeated=separate
```

ou

```bash
fd -x echo {/} | sort -k2 | uniq -f1 --all-repeated=separate
```