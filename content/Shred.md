---
title: Shred
permalink: shred
description: Supprimer définitivement des fichiers sur Linux avec la commande shred.
datePublished: 2021-06-27T19:19:00
dateUpdated: 2024-05-13T10:19:00
publish: true
rss: true
note: 69
---

Lorsqu'un fichier est supprimé, son contenu peut rester dans le système de fichiers, à moins qu'il ne soit explicitement écrasé par un autre contenu.

Pour palier à ce problème, il existe shred.

Shred est un utilitaire qui permet de supprimer définitivement des fichiers en écrivant des données aléatoires dessus.

Il est installé par défaut sur la plupart des distributions Linux.

Pour supprimer un fichier, il suffit de lancer la commande suivante :

```bash
shred -v -n2 -z -u <file>
```

Exemple :

```bash
shred -v -n2 -z -u /home/user/secret.txt
```

Pour supprimer une partition ou un disque, il suffit de lancer la commande suivante :

```bash
shred -v -n2 -z <partition|device>
```

Exemple :

> [!ATTENTION]
> **La commande suivante est très dangereuse**, elle supprimera toutes les données sur le disque. Assurez-vous de bien spécifier le bon disque.

```bash
shred -v -n2 -z -u /dev/sda
```

---

Références :

- https://wiki.archlinux.org/title/Securely_wipe_disk
- https://doc.ubuntu-fr.org/secure-delete
- [[Vie privée|Privacy]]