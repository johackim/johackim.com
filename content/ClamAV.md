---
title: ClamAV
permalink: clamav
description: Antivirus open-source pour détecter les malwares
datePublished: 2021-05-18T21:17:00
dateUpdated: 2024-05-08T21:17:00
publish: true
rss: true
---

[Clam AntiVirus](https://github.com/Cisco-Talos/clamav) (ClamAV) est un antivirus open-source pour détecter les malwares.

## Installation

Pour l'installer sur Debian ou Ubuntu :

```bash
apt update && apt install -y clamav
```

Pour l'installer sur Arch Linux :

```bash
sudo pacman -S clamav
```

## Utilisation

Pour mettre à jour sa base de donnée :

```bash
sudo freshclam
```

Pour scanner un fichier, un répertoire ou tout le système de fichier :

```bash
clamscan <file>
clamscan -r -i <folder>
clamscan -r -i --exclude-dir='^/sys|^/dev' --log=/var/log/clamscan.log /
```

Pour executé ClamAV en tâche de fond vous pouvez exécutez la commande suivante :

```bash
sudo systemctl start clamav-daemon.service
# Ou
clamd
```