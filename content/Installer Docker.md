---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: installer-docker
publish: true
note: 49
---

Pour installer [docker](https://docker.com/) sur un serveur Linux (Ubuntu ou Debian), il suffit d'exécuter cette commande :

```bash
apt update && apt install -yq docker.io
```

Si vous êtes sur Arch Linux :

```bash
sudo pacman -S docker
```

Pour le configurer :

```bash
sudo systemctl enable --now docker
gpasswd -a <user> docker
newgrp docker
```

Il existe aussi une [installation pour Windows](https://docs.docker.com/docker-for-windows/install/) et une [installation pour Mac](https://docs.docker.com/docker-for-mac/install/).