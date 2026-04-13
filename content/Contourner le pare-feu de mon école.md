---
title: Comment contourner le pare-feu de mon école ?
permalink: comment-contourner-le-pare-feu-de-mon-ecole
datePublished: 2019-10-02T06:00
dateUpdated: 2019-10-02T06:00
description: Que faire quand son école met tout en oeuvre pour pas que l'on accède à nos sites ou jeux préférés ?
publish: true
rss: true
aliases:
  - Comment contourner le pare-feu de mon école ?
---

Pendant mes études (il y a 4 ans déjà), du jour au lendemain, mon école a mis en place un système de [[Deep packet inspection|DPI]] (deep packet inspection) pour contrôler plus efficacement les protocoles utilisés par les étudiants et bannir les VPNs de façon plus radicale que de simplement bloquer les ports sortants.

**Que faire quand son école met tout en œuvre pour pas que l'on accède à nos sites ou jeux préférés ?**

Avant tout, voici un petit rappel de ce que sont un **VPN** et un **DPI**.

## C'est quoi un VPN ?

Un **VPN** (réseau privé virtuel) est un système permettant de créer un réseau privé entre deux ordinateurs. Il peut être utilisé dans les entreprises afin de pouvoir accéder à des serveurs distants, ou pour se protéger de l'espionnage et de la censure.

## C'est quoi un DPI ?

**DPI** ou inspection profonde de paquets (deep packet inspection) est un système utilisé par certaines écoles, organisations ou gouvernements (ex: la Chine), pour analyser, identifier et filtrer le trafic Internet de manière profonde.

C'est par ce moyen qu'un pays comme la chine censure tous les citoyens en interdisant l'utilisation de VPNs pour contrôler et limiter la population à l'utilisation de leurs applications et réseaux internes (Baidu, WeChat, ect...).

## Comment contourner un pare-feu (avec DPI) ?

Au début, mon école avait mis en place un "bête" pare-feu bloquant l'accès à certains ports comme le port SSH (22). Pour le contourner, il suffisait de modifier le port du serveur distant dans un port plus traditionnel comme le port HTTP (80) ou HTTPS (443).

Mais plus tard, ils ont renforcé leur politique de "sécurité" en ajoutant un **DPI** afin de bloquer l'utilisation des protocoles **VPN**.

Malheureusement pour eux, et heureusement pour nous, il existe **une méthode pour brouiller les pistes des DPI**. Cette méthode consiste à **injecter des paquets** dans les protocoles utilisés afin d'**éviter leurs détections**. On appelle ça une **méthode d'obfuscation.**

Pour mettre ça en place, il existe deux moyens, VyprVPN (solution payante) et Obfsproxy (solution gratuite).

## VyprVPN

La méthode la plus **simple et rapide** à mettre en place est [la solution VPN vyprvpn](https://vyprvpn.com/fr). Ce VPN utilise une technologie appelée **Chameleon™** qui injecte des paquets pour brouiller les pistes des DPI.

![Technologie Chameleon™](https://i.imgur.com/GFzjMHU.png)

L'installation est simple et peut se faire sur la plupart des périphériques (Windows, macOS, [[Linux]], Android, iOS).

## Obfsproxy

Cette méthode est gratuite, mais **moins facile** à mettre en place.

Prérequis :

- Un serveur [[Linux]] avec un accès SSH

On installe et exécute obfsproxy sur un serveur Linux distant :

```bash
sudo apt-get update
sudo apt-get install -y python-pip
sudo pip install obfsproxy

obfsproxy --log-min-severity=info obfs3 --dest=127.0.0.1:22 server 0.0.0.0:8080
```

On exécute obfsproxy sur notre ordinateur :

```bash
obfsproxy --log-min-severity=info obfs2 --dest=<server-ip>:8080 client 127.0.0.1:9090
```

On lance une commande SSH pour se connecter à notre serveur SSH par l'intermédiaire de obfsproxy :

```bash
ssh root@127.0.0.1 -p 9090 -C -N -vvv -D 127.0.0.1:7171
```

Puis on configure les paramètres réseau de notre navigateur pour faire passer tout notre trafic sur notre tunnel SSH :

![Paramètres réseau (firefox)](https://i.imgur.com/pU0dKUh.png)

Et voilà ! On peut désormais accéder à tous nos sites préférés sans se faire censurer 😃

## Conclusion

Je trouve ça dommage que certaines écoles utilisent ce genre de pratiques plutôt que l'**éducation**, pour empêcher les étudiants de naviguer librement.

Ce n'est peut-être pas le cas de tous, mais j'ai personnellement du mal à évoluer dans une structure où je me sens **traqué** et observé comme si quelqu'un se trouvait juste derrière mon dos pendant que je navigue sur internet, cela provoque de l'**autocensure** et ne permet en rien l'**émancipation** des élèves.

Et puis il y aura toujours des petits malins comme nous pour **contourner cette censure**.

N'hésitez pas à me poser des questions en commentaire si vous avez besoin d'aide sur l'installation d'une des deux méthodes ;)

---

Références :

- [[Cybersécurité]]