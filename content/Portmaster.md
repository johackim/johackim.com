---
title: Portmaster
permalink: portmaster
datePublished: 2022-06-22T01:21
dateUpdated: 2022-06-22T02:19
publish: true
rss: true
note: 79
---

[Portmaster](https://github.com/safing/portmaster) est un outil pour monitorer toutes ses connexions réseaux et bloquer facilement les connexions indésirables.

L'interface est agréable et peut être utilisé en complément d'autres outils comme [[NextDNS]] par exemple.

## Installation

Pour l'installer sur Linux :

```bash
curl -fsSL https://updates.safing.io/latest/linux_all/packages/install.sh | sudo bash
```

Sur Arch Linux :

```bash
yay -S --noconfirm portmaster-bin
```

## Démarrage

Pour le démarrer :

```bash
sudo systemctl enable --now portmaster
/usr/lib/portmaster/portmaster
```

PS : Si vous installez ce service sur un serveur distant, connectez-vous en RDP (avec VNC ou autre) pour pouvoir activer des protocoles entrants comme SSH.

## Règles des connexions entrantes

Portmaster bloque toutes les connexions entrantes.

Ce qui est top avec ce logiciel, c'est que vous pouvez configurer [vos règles](https://docs.safing.io/portmaster/settings#filter/serviceEndpoints) par application :

- `9.9.9.9 tcp/3000` - Autoriser l'IP `9.9.9.9` à accéder au port `3000`
- `* tcp/22` - Autoriser toutes les IPs à accéder au port `22` d'une application
- `* */44441` - Autoriser toutes les IPs à accéder au port `44441` en TCP ou UDP

Cela se paramètre dans la partie "Connection Types" > "Incoming Rules" de chaque application. Sans oublier de décocher la case "Force Block Incoming Connections" de l'application en question.

Le fait de pouvoir limiter les connexions entrantes par application réduit les champs d'action des potentiels attaquants.

## (facultatif) Paramétrer NextDNS

Si vous utilisez NextDNS, ajoutez cette configuration dans les paramètres de Portmaster :

```txt
dot://45.90.28.242?verify=xxxxxx.dns.nextdns.io&name=NextDNS&blockedif=zeroip
```

En prenant soin de modifier l'id `xxxxxx` avec celui de votre compte NextDNS.

---

Références :

- https://github.com/safing/portmaster