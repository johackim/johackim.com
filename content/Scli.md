---
title: Démarrer Signal en ligne de commande
datePublished: 2022-06-16T11:52
dateUpdated: 2022-04-12T12:01
aliases:
  - Utiliser Signal en ligne de commande
permalink: scli
publish: true
rss: true
note: 66
---

Pour envoyer et recevoir des messages via l'application [Signal](https://signal.org/fr/download/) directement dans un terminal, il existe l'application [scli](https://github.com/isamert/scli).

## Installation

Pour l'installer sur Arch Linux, exécutez les commandes suivantes et ajouter le QR code dans votre application :

```bash
yay -S --noconfirm scli
sudo pip install pyqrcode
scli link
```

## Utilisation

Pour démarrer l'application, taper simplement `scli` dans votre terminal ou votre launcher d'application préféré.

---

Références :

- https://github.com/isamert/scli
- [[Linux]]