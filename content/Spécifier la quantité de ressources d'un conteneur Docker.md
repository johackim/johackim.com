---
datePublished: 2022-06-14T09:31
dateUpdated: 2022-06-27T07:06
permalink: specifier-quantite-ressources-conteneur-docker
publish: true
rss: true
---

Il est possible de limiter la quantité de ressources d'un conteneur Docker en termes de CPU (processeur) et de RAM (mémoire).

Note : En revanche, il n'est pas possible de limiter un conteneur en termes d'espace de stockage. Cela devra se faire depuis la machine hôte.

## Limiter la RAM d'un conteneur

Par exemple, si vous démarrez un conteneur basé sur une image Debian avec le paramètre `-m 10m` (ou `--memory=10m`), le conteneur ne pourra pas dépasser 10 megabyte de RAM, exemple :

```bash
docker run --rm --name debian -m 10m -it debian bash
```

Si vous exécutez une commande `apt update` à l'intérieur du conteneur, le conteneur ne pourra pas aller au bout de l'exécution par son manque de RAM.

Vous pouvez vérifier l'utilisation des ressources utilisée des conteneurs d'un serveur avec la commande [ctop](https://ctop.sh/) pour vérifier.

## Limiter le CPU d'un conteneur

C'est le même fonctionnement pour le CPU, si vous démarrez un conteneur avec le paramètre `--cpus=0.5` et que votre machine hôte à 2 CPUs, le conteneur n'aura accès qu'à un seul CPU.

```bash
docker run --rm --name debian --cpus=0.5 -it debian bash
```