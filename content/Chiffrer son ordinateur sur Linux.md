---
datePublished: 2022-06-21T04:48
dateUpdated: 2022-06-21T06:48
permalink: chiffrer-son-ordinateur-sur-linux
publish: true
rss: true
---

Sur Linux, pour empêcher quiconque de consulter vos données, il existe plusieurs manières.

## Chiffrer son disque dur

Pour chiffrer un disque dur sur Linux, vous pouvez soit le faire depuis une interface graphique pendant l'installation d'une distribution comme Ubuntu, soit le faire en ligne de commande avec [[Cryptsetup]].

```bash
export DEVICE=/dev/sda # TO EDIT
parted -s ${DEVICE} mklabel gpt
parted -s ${DEVICE} mkpart primary 1MiB 100MiB # EFI (100MB)
parted -s ${DEVICE} mkpart primary 100MiB 350MiB # Boot (250MB)
parted -s ${DEVICE} mkpart primary 350MiB 100% # Crypted (100%)
mkfs.vfat -F32 ${DEVICE}1
mkfs.ext2 -F ${DEVICE}2
read -s -r -p "Enter new luks passphrase: " PASSPHRASE; echo
echo -n ${PASSPHRASE} | cryptsetup -q luksFormat -c aes-xts-plain64 -s 512 ${DEVICE}3 -d -
echo -n ${PASSPHRASE} | cryptsetup -q luksOpen ${DEVICE}3 lvm -d -
pvcreate -yff /dev/mapper/lvm
vgcreate arch /dev/mapper/lvm
read -r -p "Enter swap size: " -e -i "3G" SWAP_SIZE;
lvcreate -L ${SWAP_SIZE}G arch -n swap
read -r -p "Enter root size: " -e -i "100G" ROOT_SIZE;
lvcreate -L ${ROOT_SIZE} arch -n root
lvcreate -l +100%FREE arch -n home
mkfs.ext4 /dev/mapper/arch-root
mkfs.ext4 /dev/mapper/arch-home
mkswap /dev/mapper/arch-swap
```

## Chiffrer un dossier

Pour chiffrer un dossier, vous pouvez soit utiliser [[eCryptfs|eCryptfs]] :

```bash
ecryptfs-setup-private # Création du dossier chiffré ~/.Private
ecryptfs-mount-private # Montage du dossier pour pouvoir copier des fichier à l'intérieur
```

Ou [[GnuPG|GPG]] :

```bash
gpg --gen-key # Initialisation d'un clé GPG
tar czf mon_dossier.tar.gz mon_dossier # Créer une archive
gpg --encrypt mon_dossier.tar.gz # Chiffrement de l'archive
```

## Chiffrer un fichier

Si vous voulez juster chiffrer un fichier, exécuter la commande [[GnuPG|GPG]] suivante :

```bash
gpg --encrypt <file>
```