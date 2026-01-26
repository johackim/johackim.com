---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: service-docker
publish: true
rss: true
aliases:
  - Docker service
note: 61
---

Pour déployer des conteneurs dans un cluster [[Docker Swarm]], il faut créer des **services Docker**.

Les services permettent de définir un état souhaité pour une application que Docker Swarm prendra soin de gérer tout seul.

Si un conteneur d'un service s'arrête, il sera automatiquement relancer.

Il existe deux types de services :

- Les **services répliqués** ; vous spécifiez le nombre de réplicas que vous souhaitez, et ils seront attribués aux nœuds disponibles.

- Les **services globaux** ; un seul réplica sera attribué sur chaque noeud.

Le mode de réplication par défaut d'un service est répliqué. Pour déployer un service global, vous devez passer l'indicateur `--mode global` à la commande `docker service create`.

Pour créer un service, il suffit d'exécuter la commande suivante :

```bash
docker service create -p published=2368,target=2368,mode=host ghost
```

Vous pouvez accéder à votre application Ghost à l'adresse : http://localhost:2368

Pour mettre à jour un service :

```bash
docker service update --force --image ghost:5 ghost
```

Pour stopper un service :

```bash
docker service scale ghost=0
```
