---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: docker-swarm
publish: true
note: 61
---

Docker Swarm est un **orchestrateur** qui exécute, coordonne et gère automatiquement le cycle de vie des conteneurs Docker.

Il permet de répartir les conteneurs Docker selon l'utilisation des ressources (CPU, RAM, ect...) de chaque serveur.

## Ajouter un node à un cluster Docker Swarm

Un node peut être configuré en tant que **manager** ou **worker** :

- Les **managers** s'occupent de gérer l'état du cluster et de la répartition des tâches entre les workers.

- Les **workers** acceptent les tâches des managers et les exécutent.

Pour ajouter un node manager ou worker :

```bash
docker swarm join-token worker # Ajout d'un node worker
docker swarm join-token manager # Ajout d'un node manager
```

La commande précédente affichera une commande `docker swarm join` à exécuter sur le serveur que vous souhaitez ajouter à votre cluster Docker Swarm :

```bash
docker swarm join --token <token> <ip>:2377
```