---
datePublished: 2021-08-01T21:31
dateUpdated: 2021-08-01T21:31
title: Installer un serveur VPN (très rapidement) avec dsvpn
permalink: installer-un-serveur-vpn-avec-dsvpn
aliases: [Installer un serveur VPN avec dsvpn]
links: "[[VPN]]"
publish: true
rss: true
note: 67
---

[Dsvpn](https://github.com/jedisct1/dsvpn) permet de créer un serveur VPN très simplement.

## Installation

Pour l'installer dsvpn sur Arch Linux :

```bash
yay -S --noconfirm dsvpn
```

Si vous êtes sur une autre distribution Linux comme Debian ou Ubuntu :

```bash
git clone https://github.com/jedisct1/dsvpn
cd dsvpn
make
sudo cp dsvpn /usr/local/bin/dsvpn
```

Et sur raspberry :

```bash
env OPTFLAGS=-mfpu=neon make
```

## Utilisation

Pour créer un serveur VPN, voici les deux commandes à lancer :

```bash
dd if=/dev/urandom of=vpn.key count=1 bs=32
sudo dsvpn server vpn.key auto <port>
```

Pour s'y connecter depuis un client :

```bash
sudo dsvpn client vpn.key <server_ip> <port>
```

Voilà ! 😀