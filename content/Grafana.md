---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: installer-grafana-et-prometheus-avec-docker-swarm
aliases:
  - Installer Grafana et Prometheus avec Docker Swarm
publish: true
rss: true
note: 71
---

Pour monitorer une infrastructure, il existe Grafana et Prometheus.

Prometheus se chargera de collecter les données (CPU, RAM, DISK, etc..) des serveurs et Grafana les affichera sur un dashboard.

## Installation

```bash
DOMAIN=grafana.example.com docker stack deploy -c <(curl -so - https://raw.github.com/ethibox/awesome-stacks/master/stacks/monitoring.yml) monitoring
```

## Utilisation

Une fois installé vous pouvez vous rendre sur http://grafana.localhost avec les identifiants `admin:admin` et ajoutez prometheus `http://prometheus:9090/prometheus` en tant que Data Source.

Vous pouvez ensuite créer un dashboard pour monitorer vos serveurs (Conteneurs, CPU, RAM, stockage, etc...).

Voici [mon Dashboard](https://drive.proton.me/urls/Z1YKM1G9ZW#W8MCYJZH33f3) si vous souhaitez vous en inspirer.

Il faut modifier tous les uid du fichier json avec celui de votre data source.

Et pour définir le dashboard en tant que page d'accueil, il faut l'ajouter en tant que "Home Dashboard" dans les paramètres de votre profil utilisateur.

Ajouter des alertes depuis l'onglet "Alert rules".

Pour éviter de recevoir des notifications de manière répétitive, il faut mettre `1y` l'option "Repeat Interval" du menu "Notification policies" au lieu de `4h`.