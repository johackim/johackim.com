---
datePublished: 2021-09-16T22:10
dateUpdated: 2021-09-16T22:10
permalink: modifier-le-fuseau-horraire-dun-serveur-linux
publish: true
rss: true
---

Pour modifier le fuseau horaire d'un serveur [[Linux]] (ex: UTC+2), il suffit d'exécuter la commande suivante :

```bash
timedatectl set-timezone Europe/Paris
```

Si vous souhaitez connaitre les noms des fuseaux horaires :

```bash
timedatectl list-timezones
```

PS : Si la commande `timedatectl` ou que la liste des fuseaux horaires n'existe pas sur votre système Linux, installez les packages `systemd` et `tzdata` (`apt install -y systemd tzdata`).