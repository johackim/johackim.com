---
title: Installation d'une alternative open-source à Disqus
permalink: installation-alternative-open-source-disqus
datePublished: 2017-11-03T18:00
dateUpdated: 2017-11-03T18:00
description: N'ayant pas envie d'utiliser une solution propriétaire pour gérer les commentaires de mon blog je me suis configuré une petite installation de Isso via dokku.
publish: true
rss: true
aliases:
  - Disqus alternative
note: 93
---

N'ayant pas envie d'utiliser une solution propriétaire pour gérer les commentaires de mon blog et d'envoyer mes données personnelles et les vôtres (adresse IP, nom et e-mail) sur des serveurs aux USA. Je me suis configuré une petite installation de [Isso](https://posativ.org/isso/).

J'utilise [**dokku**](http://dokku.viewdocs.io/dokku/) pour simplifier la création et les potentiels mises à jour de mes applications docker. C'est pour moi le moyen le plus simple de gérer une infrastructure web sans la complexité des VHOSTS, déploiements, certificats SSL, volumes et links docker, port binding etc...

PS: Si vous ne souhaitez pas utilisé dokku, vous pouvez simplement utiliser cette commande docker :

```bash
docker run -d --name isso -p 80:80 sheogorath/isso-docker
```

## Installation

Première chose à faire on pull une image docker trouvé sur [https://hub.docker.com](https://hub.docker.com) et créer une application **dokku**.

```bash
docker pull sheogorath/isso-docker
dokku apps:create isso
```

On configure le nom de domaine de l'application ainsi que l'URL du blog qui va héberger le système de commentaire :

```bash
dokku domains:set isso isso.mondomaine.fr 
dokku config:set isso ISSO_HOST=https://blog.mondomaine.fr
```

D'autres paramètres existent, comme `ISSO_REQUIRE_EMAIL` qui permet de forcer le commentateur d'entrer une valeur dans le champ email :

|Name|Default value|Description|
|----|-------------|-----------|
|`ISSO_HOST`|`http://example.com`|It corresponds with [General] -> host [Details](https://posativ.org/isso/docs/configuration/server/#general)|
|`ISSO_NAME`|`comments.example.com`|It corresponds with [General] -> name [Details](https://posativ.org/isso/docs/configuration/server/#general)|
|`ISSO_MAX_AGE`|`30m`|It corresponds with [General] -> max-age [Details](https://posativ.org/isso/docs/configuration/server/#general)|
|`ISSO_REPLY_TO_SELF`|`false`|It corresponds with [Guard] -> reply-to-self [Details](https://posativ.org/isso/docs/configuration/server/#guard)|
|`ISSO_REQUIRE_EMAIL`|`false`|It corresponds with [Guard] -> require-email [Details](https://posativ.org/isso/docs/configuration/server/#guard)|
|`ISSO_REQUIRE_AUTHOR`|`false`|It corresponds with [Guard] -> require-author [Details](https://posativ.org/isso/docs/configuration/server/#guard)|

En temps normal, **dokku** relie directement le port 80 du reverse proxy au port 80 de notre container isso grâce à la directive EXPOSE du Dockerfile, ça ne marche pas sur mon environnement, en attendant la résolution de mon [issue](https://github.com/dokku/dokku/issues/2970) voici les commandes à exécuter :

```bash
dokku proxy:ports-add isso http:80:80
dokku proxy:ports-remove isso http:80:5000
```

Après le paramétrage on déploie l'application isso :

```bash
docker tag sheogorath/isso-docker dokku/isso
docker deploy isso
```

Le serveur est maintenant accessible sur `http://isso.mondomaine.fr`, une erreur 400 bad request apparait c'est normal, isso acceptent seulement les requêtes envoyées depuis le(s) domaine(s) autorisé(s) via la directive `ISSO_HOST`.

Maintenant que le service isso est en ligne, la configuration de la partie client se fait simplement en ajoutant la librairie JavaScript et une balise `<section>` sur notre blog :

```html
<script data-isso="//isso.mondomaine.fr/" src="//isso.mondomaine.fr/js/embed.min.js"></script>
<section id="isso-thread"></section>
```

D'autres paramètres que `data-isso` existent aussi, pour pouvoir afficher les avatars, votes, changer la langue etc... :

```html
<script data-isso="/prefix/"
        data-isso-css="true"
        data-isso-lang="ru"
        data-isso-reply-to-self="false"
        data-isso-require-author="false"
        data-isso-require-email="false"
        data-isso-max-comments-top="10"
        data-isso-max-comments-nested="5"
        data-isso-reveal-on-click="5"
        data-isso-avatar="true"
        data-isso-avatar-bg="#f0f0f0"
        data-isso-avatar-fg="#9abf88 #5698c4 #e279a3 #9163b6 ..."
        data-isso-vote="true"
        data-vote-levels=""
        src="/prefix/js/embed.js"></script>
```

Dans le cas de mon blog sous **ghost**, j'ai simplement édité mon thème Casper en ajoutant les lignes de code ci-dessus dans le fichier `post.hbs`.

## Bonus

Pour éviter de perdre les commentaires en cas de mise a jour de **isso** on peut **persister les données** de cette façon :

```bash
dokku storage:mount isso /opt/isso:/data
```

Et si l'on souhaite ajouter un certificat let's encrypt une simple commande dokku existe :

```bash
dokku letsencrypt isso
```

Voilà ! Si vous avez des questions, suggestions n'hésitez pas à les soumettre dans les commentaires ! Bon week-end ;)

---

Références :

- [[Hébergeur web]]