---
publish: true
rss: true
title: n8n
permalink: n8n
description: n8n est une alternative open-source à Zapier.
datePublished: 2024-03-25T10:00:00
dateUpdated: 2024-03-25T10:00:00
---

[N8n](https://github.com/n8n-io/n8n) est une alternative open-source à Zapier.

C'est un outil de workflow automatisé qui permet de connecter des applications, des services et des API pour automatiser des tâches répétitives.

Vous pouvez l'utiliser pour automatiser des tâches :

- Exécuter une tâche sur un logiciel tiers (ex: Trello, Toggl, etc.)
- Envoyer des notifications (e-mail, SMS, Slack, etc.)
- Publier des articles sur les réseaux sociaux
- Etc...

Il est open-source et peut être auto-hébergé sur votre propre serveur.

## Installation

Pour installer n8n, vous avez besoin de Nodejs et npm.

```bash
npm install -g n8n
```

Mais vous pouvez aussi utiliser Docker.

```bash
mkdir ~/.n8n
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
```

## Utilisation

Pour lancer n8n, vous pouvez utiliser la commande suivante :

```bash
n8n
```

n8n a de [nombreuses intégrations](https://n8n.io/integrations/) comme Trello, Stripe, Slack, Github, etc.

Chaque action est appelée un nœud (node) et peut être connectée à d'autres nœuds pour créer un workflow.

Les nœuds que j'utilise le plus souvent sont :

- `Webhook` : pour recevoir des données
- `HTTP Request` : pour appeler une API
- `Function` : pour exécuter du code JavaScript
- `IF` : pour créer des conditions
- `Wait` : pour attendre un certain temps
- `Send Email` : pour envoyer un e-mail
- `Execute Command` : pour exécuter une commande shell
- `Edit Fields (Set)` : Pour modifier les données

Vous pouvez visualiser l'exécution de chaque workflow et voir les données qui passent à travers chaque noeud.

Les [workflows](https://n8n.io/workflows) peuvent être exportés et importés au format JSON pour être sauvegardés ou partagés avec d'autres utilisateurs.

À chaque fois que j'ai besoin d'automatiser un process, je passe par n8n 😀 !

---

Références :

- [[Automatisation]]
- https://npmjs.com/search?q=keywords%3An8n-community-node-package