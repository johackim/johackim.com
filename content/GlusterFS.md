---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: glusterfs
publish: true
rss: true
note: 55
---

**GlusterFS** est [[Système de fichiers distribué]] qui peut évoluer de manière progressive pour stocker plusieurs pétaoctets de données.

Pour installer un serveur GlusterFS :

```bash
apt update && apt install -yq glusterfs-server
systemctl enable --now glusterd
```

Pour créer un volume de donnée `/mnt/glusterfs` :

```bash
gluster volume create vol01 transport tcp "127.0.0.1:/mnt/glusterfs" force
gluster volume start vol01
```

Pour accéder au volume de donnée depuis d'autres serveurs :

```bash
apt update && apt install -yq glusterfs-client
```

```bash
echo "127.0.0.1:/vol01 /mnt/data glusterfs defaults,_netdev 0 0" >> /etc/fstab
mount -a
```

PS: N'oubliez pas de modifier l'adresse ip `127.0.0.1` par l'adresse ip interne de votre serveur (ex: `10.12.180.210`).

---

Références :

- https://github.com/gluster/glusterfs