---
title: Changedetection.io
permalink: surveiller-les-changements-d-une-page-web
description: Comment détecter et être notifié des changements d'une page web avec changedetection.io ?
aliases: [Surveiller les changements d'une page web, Détecter les changements d'un site internet]
datePublished: 2024-01-22T10:00:00
dateUpdated: 2025-02-06T10:00:00
publish: true
rss: true
---

Voici un moyen pour surveiller les changements d'une page web.

Il s'agit d'un service open-source qui permet de surveiller les changements d'une page web et d'être notifié par email ou webhook.

Le service est accessible à l'adresse suivante : https://changedetection.io/

## Installation

Pour installer le service sur votre propre serveur, vous pouvez utiliser [Docker](https://docker.com).

```bash
docker run -d --name changedetection.io --restart=always -p 127.0.0.1:5000:5000 -v ~/.changedetection.io:/datastore dgtlmoon/changedetection.io
```

## Utilisation

Une fois le service lancé, rendez-vous à l'adresse http://localhost:5000.

Vous pouvez ajouter une page à surveiller dans le champ `Add a new change detection watch` et en cliquant sur `Watch`.

Pour analyser les changements régulièrement, vous pouvez modifier la fréquence de vérification dans [les paramètres](http://localhost:5000/settings#general).

Pour être notifié des changements, vous pouvez [ajouter une URL de notification](http://localhost:5000/settings#notifications).

Personnellement, j'utilise [[Ntfy]] pour être notifié des changements sur mon ordinateur ou sur mon smartphone.

J'ajoute l'URL de notification https://ntfy.sh/exemple puis je lance la commande suivante :

```bash
ntfy sub exemple 'notify-send -t 0 "ntfy" "$m"'
```

Voilà, vous pouvez être notifié à chaque changement de la page web de votre choix 😀.

## Utilisation de chrome

Si les pages web que vous souhaitez surveiller ont besoin d'exécuter du JavaScript, il faut activer le WebDriver Chrome/Javascript depuis Settings -> Fetching.

Puis démarrer une instance Chrome via Docker :

```bash
docker network create chrome

docker run -d --name chrome --restart=always --network chrome -v /dev/shm:/dev/shm selenium/standalone-chrome:4

docker run -d --name changedetection.io --restart=always -e WEBDRIVER_URL=http://chrome:4444/wd/hub -p 127.0.0.1:5000:5000 -v ~/.changedetection.io:/datastore --network chrome dgtlmoon/changedetection.io
```

---

Références :

- https://github.com/dgtlmoon/changedetection.io