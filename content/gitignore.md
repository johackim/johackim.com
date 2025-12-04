---
title: Créer un fichier .gitignore automatiquement
permalink: creer-un-fichier-.gitignore
aliases: [.gitignore]
datePublished: 2021-06-27T19:19
dateUpdated: 2021-06-27T19:19
publish: true
rss: true
note: 48
---

Pour créer un fichier `.gitignore` rapidement, il existe le service [gitignore.io](https://gitignore.io/).

```bash
# .bashrc
gi () {
    curl -L "https://gitignore.io/api/$@"
}
```

À chaque fois que je souhaite créer un fichier `.gitignore`, pour un projet Nodejs par exemple, j'exécute la commande suivante :

```bash
gi node > .gitignore
```