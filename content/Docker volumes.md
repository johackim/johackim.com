---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: creer-un-volume-docker
publish: true
note: 43
---

Afin de concerver les données d'un conteneur sur notre machine hôte, il est possible de créer des volumes Docker :

```bash
docker run -v $PWD/ghost:/var/lib/ghost/content -p 2368:2368 ghost
```

Dans cet exemple, les données seront sauvegardé dans le dossier `ghost` à l'endroit où est éxecuté la commande.

Si on n'oublie de spécifier le volume, les données de notre conteneur seront définitivement perdu à la suppression du conteneur.

Pour supprimer les volumes non utilisés par Docker et libérer de la place :

```bash
docker volume prune -f
# Ou
docker volume rm -f $(docker volume ls -qf dangling=true) > /dev/null 2>&1
```