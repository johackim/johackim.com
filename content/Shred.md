---
title: Shred
permalink: shred
description: Supprimer définitivement des fichiers sur Linux
datePublished: 2021-06-27T19:19:00
dateUpdated: 2025-12-15T10:19:00
aliases:
  - Supprimer définitivement des fichiers
publish: true
rss: true
note: 69
---

Lorsqu'un fichier est supprimé, son contenu peut rester dans le système de fichiers, à moins qu'il ne soit explicitement écrasé par un autre contenu.

Pour pallier à ce problème, il existe [shred](https://doc.ubuntu-fr.org/shred).

Shred est un utilitaire qui permet de supprimer définitivement des fichiers en écrivant des données aléatoires dessus.

Il est installé par défaut sur la plupart des distributions Linux.

## Supprimer un fichier

Pour supprimer un fichier, il suffit de lancer la commande suivante :

```bash
shred -v -n2 -z -u <file>
```

## Supprimer un dossier

Shred ne pas pas directement supprimer un dossier, mais combiné avec `find` cela fonctionne :

```bash
find <folder> -type f -exec shred -v -n2 -z -u {} \;
```

## Remplir l'espace libre

Après avoir exécuté votre commande shred, remplissez l'espace vide de votre disque dur :

```bash
dd if=/dev/urandom of=/random bs=1M status=progress; sync; \rm /random;
# Ou
wipe -r /dev/sda1
```

## Supprimer une partition ou un disque

Pour supprimer une partition ou un disque, il suffit de lancer la commande suivante :

```bash
shred -v -n2 -z <partition|device>
```

> [!WARNING]
> Apparemment, à cause du **Wear Leveling**, la commande `shred` semble inefficace sur les SSD.

Détectez si votre disque dur est un SSD ou un HDD avec la commande :

```bash
lsblk -d -o NAME,ROTA,SIZE,MODEL
```

Vérifiez dans la colonne ROTA :

- 1 = Le disque tourne. C'est un HDD (Disque dur mécanique).
- 0 = Le disque ne tourne pas. C'est un SSD (ou NVMe).

Si votre disque dur est un SSD, mieux vaut exécuter les commandes suivantes :

```bash
blkdiscard -f <device>
wipefs -a <device>
nvme format --ses=1 <device>
```

Si vous supprimez un serveur, réinstallez l'OS (Rebuild) avec un système différent (ex: passer de Debian à CentOS).

---

Références :

- https://wiki.archlinux.org/title/Securely_wipe_disk#shred
- https://github.com/martijnvanbrummelen/nwipe
- [[Vie privée|Privacy]]