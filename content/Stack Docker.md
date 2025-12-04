---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: stack-docker
publish: true
rss: true
note: 48
---

Pour créer une **stack Docker**, il suffit de créer un fichier YAML qui contient les détails des services Docker à démarrer (image, volumes, ports, labels, etc...) :

```yaml
# ghost.yml
version: '3.8'

services:
  web:
    image: ghost:latest
    ports:
      - {target: 2368, published: 2368, mode: host}
```

On peut démarrer la stack `ghost.yml` avec la commande suivante :

```bash
docker stack deploy -c ghost.yml ghost
```

Vous pouvez accéder à votre application Ghost à l'adresse : http://localhost:2368

Il est aussi possible de télécharger et d'exécuter une stack Docker via une seule ligne de commande :

```bash
docker stack deploy -c <(curl -so - https://raw.githubusercontent.com/ethibox/awesome-stacks/master/stacks/etherpad.yml) etherpad
```