---
title: Cryptsetup
permalink: cryptsetup
description: Cryptsetup est un outil pour chiffrer une partition d'un disque dur.
datePublished: 2021-08-01T21:31
dateUpdated: 2021-08-01T21:31
publish: true
rss: true
note: 57
---

[Cryptsetup](https://doc.ubuntu-fr.org/cryptsetup) est un outil pour chiffrer une partition d'un disque dur.

Voici les différentes commandes que j'utilises :

## Chiffrer une partition

```bash
cryptsetup luksFormat -c aes-xts-plain64 -s 512 /dev/sdX
```

## Ouvrir le disque dur

Pour ouvrir un disque dur :

```bash
sudo cryptsetup luksOpen /dev/sdX <volume_name>
sudo mount /dev/mapper/<mapper_name> <mount_folder>
```

Exemple :

```bash
sudo cryptsetup luksOpen /dev/sdb3 lvm
sudo mount /dev/mapper/arch-home /mnt
```

## Fermer le disque dur

Et pour déconnecter le disque dur correctement :

```bash
sudo cryptsetup luksClose <mapper_name>
udisks --detach /dev/sdX
```

## Changer le mot de passe

Pour modifier le mot de passe de son disque dur :

```bash
sudo cryptsetup luksChangeKey /dev/sdX
```

## Tester le disque dur

Pour vérifier si le disque dur est bien chiffré avec luks :

```bash
sudo cryptsetup isLuks /dev/sdX
```

Voilà 😃 !