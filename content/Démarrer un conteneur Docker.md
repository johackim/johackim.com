---
datePublished: 2021-05-18T12:40
dateUpdated: 2021-05-18T12:40
permalink: demarrer-un-conteneur-docker
publish: true
note: 44
---

Pour démarrer un conteneur Docker, basé sur l'image Docker [Ghost](https://ghost.org/) par exemple, il suffit d'exécuter la commande suivante :

```bash
docker run --name ghost -p 2368:2368 ghost
```

Rendez-vous sur http://localhost:2368 pour accèder à une application Ghost fraichement installé.