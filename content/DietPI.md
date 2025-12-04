---
title: DietPI
permalink: dietpi
description: DietPi est une distribution Linux légère pour les Raspberry Pi.
datePublished: 2024-02-12T10:00:00
dateUpdated: 2024-02-12T10:00:00
publish: true
rss: true
note: 81
---

[DietPi](https://dietpi.com/) est une distribution Linux légère pour les Raspberry Pi.

Elle est optimisée pour les performances et la consommation d'énergie.

Il s'agit d'une distribution minimaliste basée sur Debian.

## Installation

Pour installer DietPi sur un Raspberry Pi, il suffit de :

1. Télécharger l'image sur [le site officiel](https://dietpi.com/#download)
2. De la copier sur une carte micro SD avec [Etcher](https://balena.io/etcher/)
3. Puis de la mettre dans le Raspberry Pi.

## Premier démarrage

> [!IMPORTANT]
> Pensez à bien vous connecter en `root` la première fois et PAS avec l'utilisateur `dietpi`.
>
> Personnellement, je me connecte en SSH pour le premier démarrage.
>
> Cela me permet d'être à l'aise avec mon clavier et mon ordinateur habituel et éviter les erreurs.

Une fois la carte SD branché et le Raspberry Pi allumé, vous pouvez vous connecter via l'interface TTY ou en SSH avec `ssh root@X.X.X.X` (le mot de passe par défaut est `dietpi`).

Le premier démarrage installera automatiquement les mises à jour et vous demandera de changer le mot de passe par défaut.

J'installe `kodi` comme premier logiciel.

## Utilisation

Pour configurer DietPi, il suffit de taper `dietpi-launcher` dans le terminal.

Vous pouvez aussi utiliser d'autres commandes comme :

- `dietpi-software` pour installer des logiciels
- `dietpi-autostart` pour choisir quel logiciel lancer au démarrage
- `dietpi-config` pour configurer le système
- `dietpi-update` pour mettre à jour le système

Pour consulter toutes les commandes disponibles, tapez `dietpi` puis appuyez sur la touche `TAB`.

## Activer le bluetooth

Pour activer le bluetooth :

1. Exécutez la commande `dietpi-config` puis selectionnez`Advanced Options` -> `Bluetooth`.

2. Installez ce package :

```bash
apt install -y bluez-alsa-utils
```

3. Créer la configuration suivante :

```bash
sudo cp /etc/asound.conf /etc/asound.conf.bak
echo -e 'pcm.!default bluealsa\nctl.!default bluealsa' | sudo tee /etc/asound.conf
```

Pour me connecter en bluetooth :

- J'exécute la commande `bluetoothctl` en SSH
- `scan on`
- `pair <MAC>`
- `trust <MAC>`
- `connect <MAC>`

Pour tester si le son fonctionne j'exécute la commande suivante :

```bash
aplay /usr/share/sounds/alsa/Front_Center.wav
```

Si vous utilisez Kodi, désactiver l'autostart de kodi et gardez un autostart manual pour pouvoir vous connecter au bluetooth de votre Raspberry AVANT le démarrage de Kodi.

Ou connecté votre périphérique audio (si il est allumé) avant le démarrage de kodi via la commande suivante \;

```bash
echo 'bluetoothctl connect <MAC>' > /var/lib/dietpi/postboot.d/bt-speakers.sh
```

## Exemple d'utilisation avec Kodi

Dans mon cas, j'ai installé Kodi pour utiliser le Raspberry Pi comme media center :

1. J'installe `kodi` avec `dietpi-software`
2. Je le configure pour qu'il se lance au démarrage avec `dietpi-autostart`
3. Je `reboot` le Raspberry Pi

Jusqu'à présent, j'utilisais [[LibreELEC]], mais je trouve DietPi beaucoup plus flexible et moins restrictif.

On peut installer [plein d'autres logiciels](https://dietpi.com/dietpi-software.html) tout en gardant de très bonnes performances.

---

Références :

- https://korben.info/dietpi-debian-ultra-legere-optimisee-raspberry-pi-odroid-pine64.html
- [[Raspberry PI]]