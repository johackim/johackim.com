---
title: Crosstool-ng
permalink: crosstool-ng
description: Crosstool-ng est un outil permettant de compiler un logiciel avec une architecture différente de celle de notre machine.
aliases:
  - Cross compilation
datePublished: 2024-02-26T10:00:00
dateUpdated: 2025-02-03T10:00:00
publish: true
rss: true
---

[Crosstool-ng](https://github.com/crosstool-ng/crosstool-ng) est un outil permettant de compiler un logiciel avec une architecture différente de celle de notre ordinateur.

Par exemple, si vous avez un ordinateur x86_64 et que vous souhaitez compiler un logiciel pour une architecture ARM, vous pouvez utiliser Crosstool-ng.

## Installation

Pour installer Crosstool-ng sur Arch Linux, exécuter la commande suivante :

```bash
sudo pacman -S crosstool-ng
```

Pour Ubuntu/Debian :

```bash
sudo apt install -y build-essential automake flex texinfo unzip help2man libtool gwank libtool-bin bison libncurses5-dev
git clone https://github.com/crosstool-ng/crosstool-ng
cd crosstool-ng
./bootstrap
./configure --prefix=/opt/crosstool-ng
make
sudo make install
export PATH=$PATH:/opt/crosstool-ng/bin
```

## Utilisation

Exécuter la commande suivante dans le dossier de votre projet :

```bash
ct-ng menuconfig
```

Il y a 3 paramètres à configurer :

- Selectionnez l'architecture cible que vous souhaitez utiliser (par exemple, `arm`).
- Selectionnez linux comme OS via `Operating System -> Target OS`.
- Activez C++ dans `C compiler -> C++`.

Puis exécuter la commande suivante :

```bash
unset LD_LIBRARY_PATH
ct-ng build
```

Cela va générer des fichiers binaires dans le dossier `$HOME/x-tools/arm-unknown-linux-gnueabi/` :

- `arm-unknown-linux-gnueabi-gcc`
- `arm-unknown-linux-gnueabi-g++`
- etc...

Ce sont ces binaires que vous pouvez utiliser pour compiler votre logiciel pour l'architecture ARM.

Par exemple, pour compiler votre programme en C avec l'architecture ARM, exécuter la commande suivante :

```bash
arm-unknown-linux-gnueabi-gcc -o my_program my_program.c
```

ou

```bash
export CC=arm-unknown-linux-gnueabi-gcc
export CXX=arm-unknown-linux-gnueabi-g++
export PATH=$PATH:~/x-tools/arm-unknown-linux-gnueabi/bin
make # Par exemple
```

Très utile pour compiler des logiciels pour des systèmes embarqués comme le Raspberry Pi 😀 !

---

Références :

- https://github.com/crosstool-ng/crosstool-ng
- https://www.chicoree.fr/w/Compilation_croisée_facile_pour_Raspberry_Pi
- [[Compilateur]]