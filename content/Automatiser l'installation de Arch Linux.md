---
title: Comment automatiser l'installation de Arch Linux ?
permalink: comment-automatiser-installation-arch-linux
datePublished: 2018-07-30T12:45
dateUpdated: 2018-07-30T12:45
description: Afin d'éviter de réinstaller manuellement Arch Linux chaque année j'ai automatisé son installation à l'aide d'un fichier makefile.
publish: true
rss: true
---

> [!INFO]
> Contenu archivé

Afin d'éviter de réinstaller manuellement [[Arch Linux]] chaque année j'ai automatisé son installation à l'aide d'un fichier makefile. Fini la configuration manuelle de LVM, LUKS, UEFI, Grub, Nvidia, Alsa, Xorg, i3, vim, tmux, mutt, gtk etc...

**ATTENTION ! Les commandes `make` décrites dans cet article ont été créé seulement pour mon usage personnel, elles seront mises à jour plus tard pour un usage plus général. Je vous conseille de lire le fichier makefile si vous souhaitez les utiliser.**

## TL;DR

[https://github.com/johackim/dotfiles](https://github.com/johackim/dotfiles)

## Étapes d'installation

De manière générale l'installation de [[Arch Linux]] comprend de nombreuses étapes :

- Création, formatage et chiffrement des partitions
- Installation des fichiers de base de [[Arch Linux]]
- Configuration du fichier `/etc/fstab`
- Configuration du clavier (`/etc/vconsole.conf`)
- Configuration du hostname
- Configuration du fuseau horaire (`/etc/localtime`)
- Configuration de l'heure
- Configuration de la langue
- Configuration du bootloader grub
- Configuration du mot de passe root
- Configuration du dépôt multilib
- Configuration de sudo
- Configuration des services
- Installation d'un package manager pour AUR (Arch User Repository)
- Installation du serveur graphique Xorg
- Installation des drivers graphique (Nvidia, Intel)
- Installation des drivers audio (alsa, pulseaudio)
- Installation d'un gestionnaire de réseau (NetworkManager)
- Installation d'un gestionnaire de fenêtre léger (i3)
- Installation de mes packages

J'ai créé un [fichier makefile](https://github.com/johackim/dotfiles/blob/3670f49216c8ffc70e1ea2f79617f12c681cbade/makefile) qui contient toutes les commandes shell à exécuter lors de l'installation. Dorénavant, si je souhaite faire une installation complète, j'ai uniquement 2 commandes à entrer, une pour la création des partitions et l'autre pour l'installation de [[Arch Linux]].

```bash
make create-new-partitions
make install-new-arch
```

Dans le cas où mon système plante ou que je souhaite simplement réinstaller Arch Linux, seul la commande `make install-new-arch` suffit. Les partitions `root`, `boot` et `efi` seront réinitialisés et la partition `home` restera intacte.

## Dotfiles

Toutes les configurations de mes applications (vim, tmux, mutt, i3, gtk etc..) mes raccourcis clavier, mes aliases, mon thème (fonts, fond d'écran, icons, les couleurs, etc...) sont personnalisés et versionnés. Une simple commande permet de tout installer :

```bash
make install-dotfiles
```

## Conclusion

1. Créer une clé USB bootable de [Arch Linux](https://archlinux.org/download/) avec [etcher](https://github.com/balena-io/etcher)
2. Booter son ordinateur sur la clé bootable
3. Connecter l'ordinateur à internet avec la command `wifi-menu`
4. Installer les packages git et make avec la commande `pacman -S git make`
5. Cloner le repository avec la commande `git clone https://github.com/johackim/dotfiles`
6. Éxecuter les commandes `make create-new-partitions` et `make install-new-arch`

Je dispose d'un seul [dépôt](https://github.com/johackim/dotfiles) qui contient toute la configuration de mon PC. Pratique non ?

---

Références :

- https://github.com/johackim/dotfiles
- https://gist.github.com/mattiaslundberg/8620837
- https://github.com/helmuthdu/aui
- https://github.com/MatMoul/archfi
- [[Arch Linux]]