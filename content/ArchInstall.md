---
title: ArchInstall
permalink: archinstall
description: ArchInstall est un installeur automatique pour Arch Linux.
datePublished: 2024-05-13T10:00:00
dateUpdated: 2024-05-13T10:00:00
publish: true
rss: true
---

[ArchInstall](https://github.com/archlinux/archinstall) est un installeur automatique pour Arch Linux.

Il est nativement accessible sur l'ISO officiel d'Arch Linux.

Il permet d'installer et configurer automatiquement votre système en quelques minutes.

- Partitionnement
- Chiffrement
- Comptes utilisateurs
- Installation de logiciels
- Configuration du bootloader
- Configuration de la langue
- Configuration du réseau
- Configuration du clavier
- Configuration de l'audio
- Etc...

Pour lancer l'installeur, il suffit de booter sur l'ISO officiel d'Arch Linux et de taper `archinstall` :

1. Télécharger [Arch Linux](https://archlinux.org/download/)
2. Créer votre boot USB avec [[Etcher]] ou `dd if=archlinux.iso of=/dev/sdx status=progress conv=sync`
3. Désactivez le Secure Boot dans le bios
4. Booter l'USB avec la touche F2, F10, F12, DEL ou ECHAP selon votre machine
5. Tapez `archinstall` pour lancer l'installeur

Si vous avez un problème lors du lancement de la commande `archinstall`, réinstallez le package avec la commande suivante :

```bash
sudo pacman -Sy archinstall
```

En cas de problème de boot sur un vieux ordinateur, installez le bootloader `grub` et exécutez lla commande suivante après la fin de l'installation en chroot :

```bash
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=ARCH
```

> [!NOTE]
> Je vous conseille d'installer Arch Linux manuellement une première fois puis d'utiliser ArchInstall une fois que vous avez compris les bases de l'installation 🙂.

---

Références :

- https://github.com/archlinux/archinstall