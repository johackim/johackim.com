---
title: Comment installer Linux sur un smartphone ?
permalink: linux-sur-smartphone
datePublished: 2026-05-10T19:26
dateUpdated: 2026-05-10T19:26
aliases: [Linux sur Android]
links:
  - "[[Smartphones]]"
  - "[[Android]]"
  - "[[Linux]]"
publish: true
---

J'ai un rêve, pouvoir installer Linux sur mon smartphone et virer tous mes ordinateurs.

N'avoir qu'un seul équipement pour tout faire : coder, écrire, jouer, écouter de la musique, regarder des films, etc...

Mais en pratique, c'est compliqué.

Pour installer Linux sur un smartphone, il existe 4 méthodes :

1. Distribution (postmarketOS, Ubuntu Touch, Mobian etc...)
2. Conteneurisation (Chroot, Proot)
3. Virtualisation (KVM, pKVM)
4. Termux Native

## 1. Distribution

La première méthode consiste à remplacer Android par une distribution Linux.

Il existe plusieurs distributions Linux pour smartphone :

| OS                                              | Base           | Kernel         |
| ----------------------------------------------- | -------------- | -------------- |
| [Ubuntu Touch](https://ubuntu-touch.io/)        | Ubuntu         | Halium         |
| [Droidian](https://droidian.org/)               | Debian         | Halium         |
| [Sailfish OS](https://sailfishos.org/)          | Mer/Nemo/MeeGo | Halium         |
| [postmarketOS](https://postmarketos.org/)       | Alpine Linux   | Linux Mainline |
| [Mobian](https://mobian-project.org/)           | Debian         | Linux Mainline |
| [PureOS](https://pureos.net)                    | Debian         | Linux Mainline |
| [Mobile NixOS](https://mobile-nixos.github.io/) | NixOS          | Linux Mainline |

Le problème avec cette méthode, c'est qu'elle est compatible avec très peu de smartphones :

- [Fairphone 5](https://fairphone.com/fr/shop/fairphone-5-1959) (QCM6490)
- [OnePlus 6/6T](https://oneplus.com/fr/6) (SDM845)
- [PinePhone Pro](https://pine64.org/devices/pinephone_pro/) (RK3399S)

Les fabricants de **puces** (Qualcomm, MediaTek, Samsung, Apple) ne partagent pas le **code source** de leurs pilotes (drivers) ni la documentation de leurs puces (datasheets) pour des raisons de concurrence.

> [!NOTE]
> Un **pilote** (driver) est simplement un programme informatique qui fait le lien entre le matériel (la puce) et le système d'exploitation (Linux).
>
> Un **datasheet** est un document qui montre en détail comment fonctionne et comment utiliser un composant matériel.

Ce code source étant privé et gardé secrètement par ces entreprises, il n'est pas publié sur le [code source public du Kernel Linux](https://kernel.org/).

Les principales puces de smartphone qui supportent nativement Linux sont rares pour plusieurs raisons :

- Volonté d'ouverture du fabricant (ex: Rockchip RK3399)
- Reverse engineering communautaire (ex: Qualcomm Snapdragon 845 SDM845)
- Stratégie commerciale de support long terme (ex: Qualcomm Snapdragon QCM6490)

Et même si vous avez un smartphone avec l'une de ces puces, il reste le problème de compatibilités des autres composants matériels :

- Touch Screen
- Wifi
- Battery
- Audio
- Bluetooth
- Camera
- GPS
- SMS
- Calls
- NFC
- Etc..

Ce qui fait qu'il est aujourd'hui très impossible d'avoir un smartphone stable et durable sous Linux avec le support complet de tous les composants matériels.

Il est possible de consulter l'état d'avancement de la compatibilité de chaque smartphone et chaque matériel sur https://wiki.postmarketos.org/wiki/Devices.

> [!NOTE]
> **[Halium](https://halium.org)** est une couche de compatibilité qui permet de faire tourner Linux sur un smartphone Android **en réutilisant le kernel et les drivers propriétaires d'Android**.
>
> - **Avantage** : compatible avec beaucoup plus de smartphones (puisque la majorité tournent sous Android)
> - **Inconvénient** : dépendance aux blobs propriétaires d'Android, donc pas de vraie liberté logicielle ni de support kernel à long terme
>
> À l'inverse, **Linux Mainline** désigne un kernel Linux officiel, sans dépendance à Android, mais qui ne fonctionne que sur les rares puces dont les drivers sont libres.

## 2. Conteneurisation

La deuxième méthode consiste à installer Linux à l'intérieur d'Android sous la forme d'un conteneur.

Cela peut se faire de 3 façons :

1. **LXC** (vrai conteneur avec performances natives, nécessite root)
2. **Chroot** (isolation simple du système de fichiers, nécessite root)
3. **Proot** (simulation de chroot sans nécessiter root, plus lent)

Les méthodes LXC et chroot nécessitent d'avoir les **privilèges root** de son smartphone avec un outil comme [Magisk](https://github.com/topjohnwu/Magisk/) ou [KernelSU](https://kernelsu.org).

Pour utiliser ces méthodes, il existe les outils clés en main suivants :

| Outil                                                         | Méthode         | Root      |
| ------------------------------------------------------------- | --------------- | --------- |
| [UserLAnd](https://userland.tech)                             | Proot           | Non       |
| [Proot-distro](https://github.com/termux/proot-distro)        | Proot           | Non       |
| [Local Desktop](https://github.com/localdesktop/localdesktop) | Proot           | Non       |
| [Lindroid](https://github.com/Linux-on-droid/vendor_lindroid) | LXC             | Oui       |
| [Linux Deploy](https://github.com/meefik/linuxdeploy)         | Chroot          | Oui       |
| [Andronix](https://andronix.app)                              | Proot ou Chroot | Optionnel |
| [AnLinux](https://github.com/exalab/anlinux-app)              | Proot ou Chroot | Optionnel |

## 3. Virtualisation

La troisième méthode consiste à installer Linux dans une **machine virtuelle** à l'intérieur d'Android.

Cela peut se faire de 2 façons :

- **KVM** (virtualisation native du kernel Linux, performances natives)
- **pKVM** (virtualisation intégrée à Android, sans GPU)

Pour utiliser **KVM** sur un smartphone, il faut avoir accès au niveau de privilège **EL2** de la puce de votre téléphone.

> [!NOTE]
> Il existe plusieurs **niveaux de privilèges** (Exception Levels) sur un smartphone :
>
> - **EL0** : applications utilisateur (YouTube, Signal...)
> - **EL1** : système d'exploitation (Android, Linux)
> - **EL2** : hyperviseur (KVM, pKVM)
> - **EL3** : monde sécurisé (TrustZone, biométrie, DRM)

Ce niveau est verrouillé sur la plupart des smartphones à l'exception de [certains modèles spécifiques](https://renegade-project.tech/en/devices) et des Google Pixel.

De plus, il faut rooter le smartphone et compiler un kernel custom avec `CONFIG_KVM=y`.

**pKVM** est une solution intégrée nativement sur les Google Pixel sans devoir rooter son smartphone.

Par contre, il n'y a pas d'accélération GPU et il n'est pas possible d'avoir un OS custom autre que ceux imposés par Google (Debian).

Depuis Android 16, Google propose une fonction "Linux Terminal" dans les options développeur, qui lance directement Debian via pKVM.

## 4. Termux Native

La quatrième méthode consiste à installer Linux dans l'application Android Termux sans conteneur ni virtualisation.

[Termux](https://termux.dev) est une application Android qui contient un terminal et un gestionnaire de paquets (`pkg`).

Avec Termux, vous pouvez installer des outils en ligne de commande (`vim`, `git`, `python`, `node`, etc...) mais aussi un environnement de bureau complet ([XFCE4](https://xfce.org)), [Firefox](https://firefox.com) ou [VS Code](https://code.visualstudio.com).

Pour avoir une interface graphique, il faut combiner 3 composants :

- [PulseAudio](https://pulseaudio.org) — pour le son
- [Termux](https://f-droid.org/en/packages/com.termux/) — le terminal et le gestionnaire de paquets
- [Termux:X11](https://github.com/termux/termux-x11) — l'application qui affiche les fenêtres graphiques

L'inconvénient, c'est qu'il ne s'agit pas d'un vrai Linux, il n'y a pas [systemd](https://systemd.io) ou [Docker](https://docker.com) et on est limité aux paquets de Termux.

## Conclusion

Voici un tableau comparatif des 4 méthodes :

| Critère                   | 1. Distribution   | 2. Conteneur | 3. Virtualisation | 4. Termux Native |
| ------------------------- | ----------------- | ------------ | ----------------- | ---------------- |
| Apps Android conservées   | (✓) avec Waydroid | ✓            | ✓                 | ✓                |
| Vrai OS Linux             | ✓                 | (✓)          | ✓                 | x                |
| Sans root                 | ✓                 | (✓)          | (✓)               | ✓                |
| Compatibilité smartphones | x                 | ✓            | x                 | ✓                |
| Systemd / Docker          | ✓                 | x            | ✓                 | x                |
| Custom OS (Arch, etc.)    | ✓                 | ✓            | ✓                 | x                |

Actuellement, en mai 2026, je n'ai pas encore trouvé de méthode stable et durable d'installer Linux sur un smartphone.