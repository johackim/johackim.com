---
title: Docker
permalink: docker
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
publish: true
comments: false
note: 74
---

Cette page rassemble les informations les plus essentielles sur Docker.

Je vous partage les bases de tout ce que vous devez savoir pour commencer à maîtriser Docker, même si vous n'avez pas beaucoup de temps.

À la fin de cette page, vous trouverez une liste complète de tous les articles que j'ai écrits sur Docker.

## C'est quoi Docker ?

[Docker](https://docker.com) est un logiciel open-source (disponible sur [Linux](https://docs.docker.com/desktop/install/linux-install/), [Mac](https://docs.docker.com/docker-for-mac/install/) et [Windows](https://docs.docker.com/docker-for-windows/install/)) qui permet de lancer facilement des applications dans des conteneurs logiciels.

**C'est un outil qui peut empaqueter une application et ses dépendances dans un conteneur isolé, qui pourra être exécuté sur n'importe quel serveur.**

**Il ne s'agit pas de virtualisation**, mais de conteneurisation, une forme beaucoup plus légère qui s'appuie sur certaines parties de la machine hôte pour son fonctionnement.

## Tous les articles à propos de Docker

- [[Installer Docker|Comment installer Docker ?]]
- [[Démarrer un conteneur Docker|Comment démarrer un conteneur Docker ?]]
- [[Supprimer un conteneur Docker|Comment supprimer un conteneur Docker ?]]
- [[Lister les conteneurs Docker|Comment lister les conteneurs Docker ?]]
- [[Docker volumes|Comment créer un volume Docker ?]]
- [[Entrer à l'intérieur d'un conteneur Docker|Comment entrer à l'intérieur d'un conteneur Docker ?]]
- [[Spécifier la quantité de ressources d'un conteneur Docker|Comment spécifier la quantité de ressources d'un conteneur ?]]
- [[Minecraft|Comment installer Minecraft avec Docker ?]]
- [[Traefik|Comment installer Traefik en tant que reverse proxy avec Docker ?]]

## Tous les articles à propos de Docker Swarm

- [[Docker Swarm|Docker Swarm c'est quoi ?]]
- [[Initialiser un cluster Docker Swarm|Comment initialiser un cluster Docker ?]]
- [[Service Docker|Comment créer un service Docker ?]]
- [[Créer un service Docker avec plusieurs replicas|Comment créer un service Docker avec plusieurs replicas ?]]
- [[Stack Docker|Comment créer une stack Docker ?]]
- [[Ajouter un node à un cluster Docker Swarm|Comment ajouter un node à un cluster Docker Swarm ?]]
- [[Installer Traefik avec Docker Swarm|Comment installer Traefik avec Docker Swarm ?]]

## Commandes utiles

```bash
# Remove unused containers
docker rm $(docker ps -qf status=exited)
docker rm $(docker ps -qf status=created)
docker rm $(docker ps -qf status=dead)

# Remove unused volumes
docker volume rm -f $(docker volume ls -qf dangling=true)

# Exec a docker container/service
docker exec -it $(docker ps -qf name=service_name) bash

# Télécharger un fichier depuis un container docker
docker cp <container_id>:<file_path> <output_path>

# Voir les stats (cpu, memory)
docker stats --no-stream

# Supprimer tous les conteneurs, images et volumes inutilisés
docker system prune -af

# Trouver le conteneur en lien avec son PID
docker ps -f id=$(grep -o "[0-9a-f]\{64\}" /proc/<PID>/cgroup | head -n 1)

# Connaitre la raison du crash d'un conteneur
docker inspect <container> --format='Code: {{.Status.ContainerStatus.ExitCode}} Raison: {{.Status.Message}}'

# Composer une stack docker
docker compose -f <stack.yml> config

# Déployer une stack avec un fichier .env
env $(cat .env) docker stack deploy -c stack.yml stack

# Arrêter un service docker
docker service scale service_name=0

# Voir les tags d'une image (ex: jitsi/jvb) sur docker hub
for i in {1..20}; do curl -s "https://registry.hub.docker.com/v2/repositories/$IMAGE/tags?page_size=100&page=$i" | jq -r '.results[] | .name'; done | sort -V
```