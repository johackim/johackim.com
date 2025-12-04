---
datePublished: 2021-11-21T20:31
dateUpdated: 2022-08-25T06:18
title: Shadow sur Linux
permalink: shadow-linux
publish: true
rss: true
---

Anciennement, j'avais fait [[Jouer sur Linux avec 95% de performance native|un tutoriel sur  comment jouer sur Linux]] et c'était une véritable galère.

Aujourd'hui il existe [Shadow](https://shop.shadow.tech/pre-order/invite/JOARFUQO) pour palier à ce problème.

C'est un **service cloud** pour louer une machine **Windows** avec une bonne carte graphique afin de pouvoir jouer à ces jeux préférés.

Voici un tutoriel pour les personnes qui veulent jouer sur Linux même si ils disposent d'un vieux PC.

## Installation

Si vous êtes sur **Linux** et que vous avez une [bonne connexion internet](https://shadow.tech/fr/configuration/internet-speed-test), voici les commandes a exécuter pour installer [Shadow](https://shop.shadow.tech/pre-order/invite/JOARFUQO) :

**En version stable** :

```bash
sudo wget -O /usr/local/bin/shadow https://update.shadow.tech/launcher/prod/linux/ubuntu_18.04/Shadow.AppImage
sudo chmod +x /usr/local/bin/shadow
```

**En version beta** :

```bash
sudo wget -O /usr/local/bin/shadow https://update.shadow.tech/launcher/preprod/linux/ubuntu_18.04/ShadowBeta.AppImage
sudo chmod +x /usr/local/bin/shadow
```

**En version alpha** :

```bash
sudo wget -O /usr/local/bin/shadow https://update.shadow.tech/launcher/testing/linux/ubuntu_18.04/ShadowAlpha.AppImage
sudo chmod +x /usr/local/bin/shadow
```

> [!NOTE]
> Si vous êtes sur windows, utilisez le lien https://shdw.me/winalpha.

**Avec docker** :

```bash
sudo -E pip install -U docker-compose
git clone https://gitlab.com/aar642/shadowcker.git ~/.shadowcker
cd ~/.shadowcker
xhost +localhost && xhost +local:docker
make stable # beta ou alpha
make start
```

<!-- ignore -->

```diff
diff --git a/Makefile b/Makefile
index 50cd2ea..31b7ec7 100644
--- a/Makefile
+++ b/Makefile
@@ -9,6 +9,7 @@ SHELL=/bin/sh
 run: beta start

 start:
+    xhost +localhost && xhost +local:docker
     ./check.sh && USER_ID=${shell id -u} docker-compose up --scale shadowcker=$$([ ! "${DUAL_SCREEN}" = "false" ] && echo 2 || echo 1)

 stop:
diff --git a/alpha/Dockerfile b/alpha/Dockerfile
index e4dc3fc..a31ab55 100644
--- a/alpha/Dockerfile
+++ b/alpha/Dockerfile
@@ -86,6 +86,13 @@ RUN ln -s /usr/lib/x86_64-linux-gnu/dri/i965_drv_video.so /usr/lib/x86_64-linux-
 RUN ln -s /usr/lib/x86_64-linux-gnu/dri/i965_drv_video.so /usr/lib/x86_64-linux-gnu/dri/crocus_drv_video.so
 RUN dd if=/dev/zero bs=1 count=3 seek=8 conv=notrunc of=/home/shadow-user/AppImage/ShadowAlpha.AppImage

+RUN wget -qO- http://repository.shadow.tech/shadow_signing.key | gpg --dearmor > packages.shadowapp.gpg
+RUN install -o root -g root -m 644 packages.shadowapp.gpg /etc/apt/trusted.gpg.d/
+RUN sh -c 'echo "deb [arch=amd64] http://repository.shadow.tech/preprod bullseye main" > /etc/apt/sources.list.d/shadow-preprod.list'
+RUN rm -f packages.shadowapp.gpg
+RUN apt update
+RUN apt install -y shadowusb
+
 USER shadow-user

 ENV LD_LIBRARY_PATH=''
```

```bash
# ~/.private_aliases
alias shadow='cd ~/.shadowcker && make start'
```

<!-- end ignore -->

Et voici les packages a installer selon votre **carte graphique** et votre **distribution linux** :

| Distribution Linux | Carte graphique | Package                                                            |
| ------------------ | --------------- | ------------------------------------------------------------------ |
| Arch Linux         | Intel           | `libva-intel-driver`                                               |
| Arch Linux         | NVIDIA          | `nouveau-fw`                                                       |
| Arch Linux         | AMD             | `mesa-vdpau`                                                       |
| Ubuntu             | Intel           | `intel-media-va-driver-non-free`                                   |
| Ubuntu             | NVIDIA          | [libva-vdpau-driver](https://gitlab.com/aar642/libva-vdpau-driver) |
| Ubuntu             | AMD             | `vdpau-va-driver` ou `mesa-va-drivers`                             |

Personnellement; je suis sur Arch Linux, du coup j'installe ce driver :

```bash
sudo pacman -S libva-intel-driver
```

Et voici mon script d'installation complet pour Arch Linux :

```bash
yay -S --noconfirm shadow-tech gnome-keyring libva-intel-driver
```

## Démarrer shadow depuis un live usb

Si vous ne souhaitez pas ou n'arrivez pas à installer shadow directement sur votre Linux, vous pouvez utiliser cet [OS en live usb](https://gitlab.com/NicolasGuilloux/shadow-live-os).

Télécharger [le fichier .iso](https://gitlab.com/NicolasGuilloux/shadow-live-os/-/jobs/artifacts/nix-master/raw/Shadow-LiveOS.iso?job=shadow-beta).

Ajouter le sur une clé USB avec [Etcher](https://balena.io/etcher/) ou via une commande `sudo dd if=Shadow-LiveOS.iso of=/dev/sda3 status=progress conv=sync`.

## Problème de couleurs d'image rouge et jaune

Si vous rencontrez un problème d'image qui devient tout rouge et jaune. Exécutez la commande suivante :

```bash
sudo wget -O /etc/drirc https://raw.githubusercontent.com/NicolasGuilloux/blade-shadow-beta/master/resources/drirc
```

## Problème de clavier / souris

Si comme moi vous avez de manière aléatoire des problèmes de lag avec votre clavier et/ou votre souris.

Des touches qui restent virtuellement enfoncées ou des appuis de touche non pris en compte.

Exécutez les commandes suivantes :

```bash
wget -qO- http://repository.shadow.tech/shadow_signing.key | gpg --dearmor > packages.shadowapp.gpg
install -o root -g root -m 644 packages.shadowapp.gpg /etc/apt/trusted.gpg.d/
sh -c 'echo "deb [arch=amd64] http://repository.shadow.tech/preprod bullseye main" > /etc/apt/sources.list.d/shadow-preprod.list'
rm -f packages.shadowapp.gpg
apt update
apt install -y shadowusb
```

## Démarrer Shadow en dual boot

Pour créer un dual boot, créer une nouvelle partition puis ajouter [ce fichier iso](https://gitlab.com/NicolasGuilloux/shadow-live-os/-/jobs/artifacts/nix-master/raw/Shadow-LiveOS.iso?job=shadow-beta) avec une commande dd :

```bash
sudo dd if=Shadow-LiveOS.iso of=/dev/sda3 status=progress conv=sync
```

Prenez exemple sur le fichier `/EFI/boot/grub.cfg` à l'intérieur de l'iso, puis ajouter l'entrée suivante à la [configuration de Grub](https://wiki.archlinux.org/title/GRUB#GNU/Linux) de votre machine hôte dans le fichier `/etc/grub.d/40_custom`, exemple :

```txt
menuentry "Shadow" {
        set root=(hd0,3)
        linux /boot/bzImage ${isoboot} init=/nix/store/1d56fdsc3y69040l0g6zxipm7x1c6qdg-nixos-system-Shadow-LiveOS-21.05pre283529.8389dcb67d9/init root=LABEL=ShadowOS
        initrd /boot/initrd
}
```

Sans oublier d'exécuter cette commande pour mettre à jour votre nouvelle configuration grub.

```bash
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## Réparer l'erreur R-0x7F

Je rencontre un problème pour me rendre sur ma machine Shadow depuis mon système Arch Linux, je reçoit une erreur R-0x7F. Pour résoudre cette erreur, j'installe la package suivant :

```bash
yay -S --noconfirm libldap24
```

---

Références :

- https://shadow.tech
- https://pc.shadow.tech
- https://github.com/NicolasGuilloux/blade-shadow-beta
- https://nicolasguilloux.github.io/blade-shadow-beta/
- [LineageOS on my RaspberryPI 4](https://forum.shadow.tech/compatibility-44/anyone-usingbshadow-on-a-pi-223?postid=9439#post9439)
- https://aur.archlinux.org/packages/shadow-tech/
- https://blog.henricook.com/shadow-pc-support-for-ubuntu-2110
- https://gitlab.com/aar642/shadow-repackaged#known-issues
- https://frsbg01.filebrowser.shadow.tech/shadowftp/login
- [[Jeux vidéos]]