---
permalink: adb
description: Adb, l'outil pour gérer votre smartphone Android depuis votre ordinateur.
datePublished: 2024-01-15T10:00:00
dateUpdated: 2024-01-15T10:00:00
publish: true
rss: true
---

Adb est un outil pour gérer votre smartphone Android en ligne de commande depuis votre ordinateur.

Il vous permet de transférer des fichiers, de faire des captures d'écran, d'installer des applications, de faire des sauvegardes, de redémarrer votre téléphone, etc...

## Installation

Pour l'installer sur Arch Linux :

```bash
sudo pacman -S android-tools
```

Pour l'installer sur Ubuntu :

```bash
sudo apt update && sudo apt install -y android-tools-adb
```

NOTE : N'oubliez pas de connecter votre smartphone et d'appuyer sur "Use USB to Transfer files" dans le centre de notifications.

## Lister les périphériques

Pour lister les périphériques connectés :

```bash
adb devices
```

## Se connecter à son smartphone

Pour vous connecter à votre smartphone :

```bash
adb shell
```

## Copier des fichiers

Vous pouvez copier des fichiers depuis votre ordinateur vers votre smartphone et vice-versa :

```bash
adb push <path to file on computer> <location where you want to save file>
adb pull <path to file on device> <location where you want to save file>
```

## Prendre un screencast

Pour prendre un screencast de votre smartphone :

```bash
adb shell
screenrecord <path/file.mp4>
```

## Prendre un screenshot

Pour créer un screenshot de votre smartphone :

```bash
adb shell screencap <file.png>
```

## Créer un backup

Pour faire une sauvegarde de votre smartphone :

```bash
adb backup -apk -shared -all
```

Cela va créer un fichier `backup.ab` que vous pouvez garder sur votre ordinateur.

## Déchiffrer un backup

Pour décrypter et extraire un `backup.ab`, vous pouvez utiliser [ce script Python](https://github.com/lclevy/ab_decrypt) :

```bash
wget https://raw.githubusercontent.com/lclevy/ab_decrypt/master/ab_decrypt.py
python ab_decrypt.py -b backup.ab -o backup.tar
```

ou [ce script Java](https://github.com/nelenkov/android-backup-extractor/releases/) :

```bash
java -jar abe.jar unpack backup.ab backup.tar
```

## Installer une application

Pour installer une application sur votre smartphone :

```bash
adb install <app.apk>
```

## Redémarrer sur le bootloader

Si vous souhaitez changer de ROM, vous pouvez redémarrer sur le bootloader avec la commande suivante :

```bash
adb reboot bootloader
```

## Multiple devices

Si vous avez plusieurs devices sur le même ordinateur, il est possible que vous ayez l'erreur `adb: more than one device/emulator`.

Pour éviter cela, reprenez l'identifiant de votre device via `adb devices` puis renseigner le dans la commande suivante :

```bash
adb -s <device> <command>
```

---

Références :

- [[Android]]
- https://github.com/liriliri/aya