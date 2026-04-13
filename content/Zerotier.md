---
title: Zerotier
permalink: zerotier
description: Zerotier est un logiciel de réseau privé virtuel qui permet de connecter des ordinateurs entre eux sur un réseau virtuel.
datePublished: 2024-03-11T10:00:00
dateUpdated: 2024-03-11T10:00:00
publish: true
rss: true
---

[Zerotier](https://zerotier.com/) est un logiciel de réseau privé virtuel qui permet de connecter des ordinateurs entre eux sur un réseau virtuel.

Il ne s'agit PAS d'un VPN.

Si vous avez plusieurs ordinateurs qui ne sont pas sur le même réseau local, vous pouvez les connecter entre eux avec Zerotier.

Ce n'est pas open-source, mais il est gratuit pour un usage personnel.

## Installation

Pour l'installer sur Linux :

```bash Linux
curl -s https://install.zerotier.com/ | sudo bash
```

Pour l'installer sur Arch Linux :

```bash Arch Linux
sudo pacman -S zerotier-one
```

Il existe aussi une application pour [Windows](https://download.zerotier.com/dist/ZeroTier%20One.msi) et [Mac](https://download.zerotier.com/dist/ZeroTier%20One.pkg).

## Utilisation

Commencez par lancer le service Zerotier :

```bash
sudo systemctl start zerotier-one
```

Pour joindre un réseau, vous avez besoin de l'identifiant du réseau.

Rendez-vous sur le [site de Zerotier](https://my.zerotier.com/) pour créer un compte (Gratuit) et créer un réseau.

Une fois le réseau créé, vous pouvez récupérer l'identifiant du réseau (Network ID).

Ensuite, pour joindre le réseau, utilisez la commande suivante :

```bash
zerotier-cli join <network>
```

Pour voir les ordinateurs connectés au réseau, utilisez la commande suivante :

```bash
zerotier-cli listpeers
```

Pour quitter le réseau, utilisez la commande suivante :

```bash
zerotier-cli leave <network>
```

Pratique pour pouvoir jouer à des jeux en multijoueur lorsque vous n'êtes pas sur le même réseau local que vos amis 🙂 !

---

Références :

- [[Linux]]