---
datePublished: 2021-05-31T16:00
dateUpdated: 2021-05-31T16:00
permalink: initialiser-un-projet-gatsby
publish: true
rss: true
note: 49
---

Pour initialiser un projet [Gatsby](https://gatsbyjs.com/), il suffit d'installer [node.js](https://nodejs.org) puis exécuter cette commande :

```bash
npm install --save gatsby react react-dom
```

Une fois installé, vous pouvez démarrer Gatsby avec la commande suivante :

```bash
./node_modules/.bin/gatsby develop
```

Puis ajoutez ces lignes dans votre fichier `package.json` afin d'avoir accès aux commandes de gatsby plus facilement :

```json
"scripts": {
    "build": "gatsby build",
    "start": "gatsby develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean"
}
```

Vous pouvez à présent exécuter la commande `npm start` pour démarrer Gatsby.

PS : Exécutez la commande `npm init -f` si votre fichier `package.json` n'existe pas.