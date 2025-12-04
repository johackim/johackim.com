---
datePublished: 2021-09-16T22:10
dateUpdated: 2021-09-16T22:10
permalink: installer-une-version-modifie-dun-package-aur-sur-arch-linux
title: Installer une version modifié d'un package AUR sur Arch Linux
publish: true
rss: true
note: 71
---

Sur Arch Linux, Il m'arrive parfois de vouloir installer un package (ex: `mailspring`) avec une version très récente et qui n'est pas encore packagé dans les dépôts AUR.

Voici la procédure que j'utilise pour télécharger, modifier et installer un package AUR afin d'avoir la dernière version de mon logiciel.

## Télécharger le package AUR

Téléchargez le package AUR avec une commande `yay` :

```bash
yay -G mailspring
```

Récupérez la valeur sha256 du package en le téléchargeant manuellement :

```bash
wget https://github.com/Foundry376/Mailspring/releases/download/1.9.2/mailspring-1.9.2-amd64.deb
sha256sum mailspring-1.9.2-amd64.deb
# a3bc365c77791673d8b7d8fc2081b2e8e80ab5d78d6ffa99f848971849f43544
```

## Modifier le package

Je renseigne cette valeur dans le fichier `PKGBUILD` :

```diff
index 66c3d17..3fbe5a4 100755
--- a/PKGBUILD
+++ b/PKGBUILD
@@ -5,7 +5,7 @@
 # Contributor: ahrs

 pkgname=mailspring
-pkgver=1.9.1
+pkgver=1.9.2
 pkgrel=1
 pkgdesc="A beautiful, fast and maintained fork of Nylas Mail by one of the original authors."
 arch=('x86_64')
@@ -16,7 +16,7 @@ options=('!strip')
 source=()

 source_x86_64=("https://github.com/Foundry376/Mailspring/releases/download/${pkgver}/mailspring-${pkgver}-amd64.deb")
-sha256sums_x86_64=('99fa700d84691542c3f5387cb48e72a9be516166491daadb598a5f292dd0ea61')
+sha256sums_x86_64=('a3bc365c77791673d8b7d8fc2081b2e8e80ab5d78d6ffa99f848971849f43544')

 depends=("libxss" "libtool" "c-ares" "ctemplate" "tidy" "libxkbfile" "libsecret" "gtk3" "nss" "libglvnd")
```

## Installer le nouveau package

Puis installez le package modifié avec une commande suivante `makepkg` :

```bash
makepkg -si
```

## Partager les modifications

Pour partager votre modification aux autres, commencez par créer une clé ssh :

```bash
ssh-keygen -f ~/.ssh/aur
```

Ensuite, ajoutez les lignes suivantes dans votre fichier `~/.ssh/config` :

```txt
Host aur.archlinux.org
  IdentityFile ~/.ssh/aur
  User aur
```

Puis envoyez vos modifications :

```bash
git remote set-url origin ssh://aur@aur.archlinux.org/<pkgname>.git
git push origin master
```

---

Références :

- [[Arch Linux]]
- [[Yay]]