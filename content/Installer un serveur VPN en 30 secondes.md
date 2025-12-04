---
title: Installer un serveur VPN en 30 secondes
permalink: installer-un-vpn-en-30-secondes
datePublished: 2018-01-08T08:00
dateUpdated: 2018-01-08T08:00
description: Vous avez besoin d'un VPN et vous ne souhaitez pas vous embêter à configurer un serveur openvpn manuellement ? Voici une solution pour installer un VPN en 30 secondes.
publish: true
rss: true
note: 71
---

Vous avez besoin d'un VPN et vous ne souhaitez pas vous embêter à configurer un serveur openvpn manuellement ? Voici une solution pour installer un VPN en 30 secondes.

## Prérequis

- Un serveur distant avec **docker** installé
- Un client **openvpn** sur votre workstation

## Installation

```bash
# Déploiement du container dockvpn sur votre server distant
CID=$(docker run -d --name dockvpn --restart=always --privileged --net=host ston3o/dockvpn)
```

```bash
# Récupéreration de l'url d'accès au fichier de config `.ovpn` (server distant)
docker run -t -i -p 8080:8080 --volumes-from $CID ston3o/dockvpn serveconfig
```

```bash
# Démarrer le client openvpn depuis votre workstation
curl -s --insecure -o dockvpn.ovpn <URL> # Téléchargement du fichier .ovpn
openvpn dockvpn.ovpn
```

PS : N'oubliez pas de fermer le deuxième container pour ne pas exposer votre fichier de configuration à d'autres personnes. Si l'accès à votre **VPN** ne fonctionne pas, **vérifiez vos firewalls**, le port `1194` de votre serveur doit être accessible.

[Un autre article](https://xorhak.io/mettre-en-place-rapidement-openvpn/) a été récemment rédigé sur le sujet avec une autre image docker si ça vous intéresse.

C'est un petit article cette semaine, j'espère que ça vous fera gagner du temps ;)

---

Références :

- [[VPN]]