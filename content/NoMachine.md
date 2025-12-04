---
title: NoMachine
permalink: nomachine
description: NoMachine est un outil pour accéder à un ordinateur à distance.
datePublished: 2021-10-24T20:00
dateUpdated: 2024-11-01T20:00:00
publish: true
rss: true
---

Pour accéder à un ordinateur à distance, il existe un outil qui s'appelle [NoMachine](https://nomachine.com/).

Je l'utilise principalement car c'est la solution la plus rapide que j'ai trouvé en termes de vitesse d'affichage.

Ce n'est pas open-source, mais il est gratuit pour un usage personnel.

## Installation

Pour l'installer [rendez-vous sur le site Officiel](https://downloads.nomachine.com/), ou exécutez cette commande si vous êtes sur Arch Linux :

```bash
yay -S --noconfirm nomachine
```

## Utilisation

Une fois installé sur vos 2 machines (client et serveur), ajoutez votre machine distante depuis votre machine hôte en spécifiant le Host (ex: monserveur.com).

![NoMachine Settings](https://i.imgur.com/L01nZUd.jpg)

Pensez à configurer votre pare-feu pour autoriser le port 4000 ou à faire du port fowarding avec SSH.

Et si jamais vous avez besoin de redémarrer le serveur, exécutez la commande suivante :

```bash
sudo /etc/NX/nxserver --restart
```

## Configuration Audio

Concernant l'audio, je vous conseille d'installer PulseAudio côté serveur :

```bash
sudo pacman -S pulseaudio
```

Il faut que le paramètre `AudioInterface` soit configuré sur `pulseaudio` dans le fichier `/usr/NX/etc/node.cfg`.

Dans le cas contraire, le plus simple est de supprimer tous les paquets liés à une autre interface (ex: PipeWire) et de réinstaller NoMachine via `yay -Rsn nomachine`.

Vous trouverez plus d'information [sur ce lien](https://forum.nomachine.com/topic/no-audio-with-pulseaudio-system-instance) pour configurer PulseAudio.

## Se connecter depuis SSH

Si vous voulez vous connecter depuis SSH via du port forwarding, exécutez la commande suivante :

```bash
ssh -N -L 4000:127.0.0.1:4000 user@server
```

---

Références :

- [[Linux]]