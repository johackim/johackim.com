---
datePublished: 2021-05-30T19:50
dateUpdated: 2021-05-30T19:50
permalink: creer-un-service-docker-avec-plusieurs-replicas
publish: true
rss: true
---

Il est possible de créer plusieurs conteneurs dans un seul service Docker. Ces conteneurs sont appelé des replicas.

```mermaid
graph TD;
    Service["Service"]-->Conteneur1[Conteneur 1]
    Service-->Conteneur2[Conteneur]
    Service-.->Conteneur3[Conteneur]
```

La commande suivante aura pour objectif de créer 3 replicas basé sur l'image Docker ghost :

```bash
docker service create --replicas 3 ghost
```

Si on exécute la commande `docker ps -a`, on remarquera l'apparition de 3 conteneurs ghost.