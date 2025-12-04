---
datePublished: 2021-07-05T16:31
dateUpdated: 2021-07-05T16:31
permalink: debugger-un-site-internet-sur-ipad-depuis-linux
publish: true
rss: true
note: 60
---

J'ai rencontré un problème d'affichage d'un de mes sites sur iPad, du coup, pour débugger ça depuis mon ordinateur sous [[Linux|Arch Linux]], j'ai utilisé le package `ios-webkit-debug-proxy`.

## Installer le package ios-webkit-debug-proxy

Commencez par installer le package `ios-webkit-debug-proxy` :

```bash
yay -S --noconfirm ios-webkit-debug-proxy
```

## Brancher l'ipad

Brancher l'iPad, puis exécutez les commandes suivantes :

```bash
sudo systemctl restart usbmuxd
sudo idevice_id -l
ios_webkit_debug_proxy
```

## Accez à l'outil devtools

Rendez-vous sur [http://localhost:9222/](http://localhost:9222/) pour accéder à l'outil devtools.