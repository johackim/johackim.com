---
title: Brightnessctl
permalink: brightnessctl
description: Brightnessctl est un utilitaire en ligne de commande pour contrôler la luminosité de son écran sur Linux.
datePublished: 2021-11-21T20:31
dateUpdated: 2024-05-13T20:31:00
aliases:
  - Luminosité
publish: true
---

[Brightnessctl](https://github.com/Hummer12007/brightnessctl) est un utilitaire en ligne de commande pour contrôler la luminosité de son écran sur [[Linux]].

## Installation

Pour l'installer sur Arch Linux, utilisez la commande suivante :

```bash
sudo pacman -S brightnessctl
```

Sur Ubuntu/Debian :

```bash
sudo apt install -y brightnessctl
```

## Utilisation

Pour l'utiliser, utilisez la commande suivante pour définir le pourcentage de luminosité :

```bash
brightnessctl set <pourcentage>
```

Exemples :

```bash
brightnessctl set +10% # Augmente la luminosité de 10%
brightnessctl set 10%- # Diminue la luminosité de 10%
```

---

Références :

- https://github.com/Hummer12007/brightnessctl
- https://wiki.archlinux.org/title/Backlight