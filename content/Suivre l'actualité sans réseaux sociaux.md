---
title: Comment suivre l'actualité sans compte facebook, twitter ou youtube ?
permalink: comment-suivre-actualite-sans-compte-facebook-twitter-youtube
datePublished: 2017-12-11T08:00
dateUpdated: 2017-12-11T08:00
description: Pour suivre l'actualité sans détenir de compte sur des réseaux comme Facebook, Twitter ou YouTube j'utilise les flux RSS. Il est possible de suivre des chaines YouTube, des pages Facebook, des comptes Twitter, être alerté des sorties d'album d'un artiste ou des épisodes d'une série.
aliases:
  - Comment suivre l'actualité sans compte facebook
  - twitter ou youtube ?
publish: true
rss: true
---

Pour suivre l'actualité sans détenir de compte sur des réseaux comme Facebook, Twitter ou YouTube j'utilise [les flux RSS](https://johackim.com/rss/). Il est possible de suivre des chaines YouTube, des pages Facebook, des comptes Twitter, être alerté des sorties d'album d'un artiste ou des épisodes d'une série.

## Choisir un client RSS

Pour pouvoir lire ces flux, il faut dans un premier temps un client RSS, voici ma sélection des clients **console**, **UI** et **web**.

### 1. Client console

Étant personnellement addicte à la console j'utilise **[newsboat](https://github.com/newsboat/newsboat)** comme client RSS.

![screenshot](https://i.imgur.com/2Ulp1Qm.png)

### 2. Clients UI

Si la console vous fait peur, [thunderbird](https://mozilla.org/fr/thunderbird/) peut être utilisé en tant que client RSS.
[firefox](https://mozilla.org/fr/firefox/new/) permet aussi de suivre vos flux RSS depuis votre barre de favoris.

### 3. Clients web

Si vous souhaitez autohéberger une solution web sur un serveur distant ou localement il existe plusieurs solutions à installer facilement avec **docker** :

- [freshrss](https://freshrss.org)

```bash
docker run -d --name=freshrss -p 80:8888 wonderfall/freshrss
```

- [selfoss](https://selfoss.aditu.de)

```bash
docker run -d --name selfoss -p 80:80 jenserat/selfoss
```

- [Tiny Tiny RSS](https://tt-rss.org/)

```bash
docker run -d --name db postgres
docker run -d --name tiny-tiny-rss --link db:postgres -e SELF_URL_PATH=http://localhost/ -p 80:80 siomiz/tiny-tiny-rss
```

Et si vous n'avez toujours pas trouvé votre bonheur [d'autres alternatives existent](https://alternativeto.net/category/books--news/rss-feed-reader/).

## S'abonner à une chaine YouTube

M'abonner a une chaine YouTube m'obligerait à détenir un compte google, au lieu de ça j'utilise les flux RSS d'une chaine ou playlist YouTube.

Lorsque vous vous rendez sur une chaine YouTube, par exemple [cash investigation](https://youtube.com/user/cashinvestigationf2/) son URL peut exister sous deux formes différentes :

1. https://youtube.com/channel/UC9gcw8-7IzzaosI4c0KCP0g
2. https://youtube.com/user/cashinvestigationf2/

![youtube](https://i.imgur.com/7O21sUZ.jpg)

Pour le premier cas, on récupère l'ID **UC9gcw8-7IzzaosI4c0KCP0g** :

https://youtube.com/feeds/videos.xml?channel_id=UC9gcw8-7IzzaosI4c0KCP0g

Dans le second cas c'est le nom d'utilisateur qu'on récupère : **cashinvestigationf2**

https://youtube.com/feeds/videos.xml?user=cashinvestigationf2

Et pour une playlist YouTube, c'est l'ID de la playlist qu'il faut prendre :

https://youtube.com/feeds/videos.xml?playlist_id=PL43OynbWaTMJf3TBZJ5A414D5f7UQ8kwL

Pour combiner vos flux RSS [rendez-vous un peu plus bas dans cet article](rendez-vous un peu plus bas dans cet article).

## Suivre une page Facebook, un compte Twitter

Il est aussi possible de générer le flux RSS d'une page Facebook publique ou un compte Twitter à l'aide d'un service en ligne qui se nomme [fetchrss](http://fetchrss.com).

En revanche, son utilisation gratuite présente plusieurs désavantages :

- les pubs ajouté dans vos flux
- les flux RSS supprimés après 7 jours de non-utilisation
- le nombre de flux limité à 5.

PS: Je pense remplacer se service prochainement par un script [scrapy](https://scrapy.org/) maison.

## Autres astuces

### Combiner plusieurs flux RSS

[rssmix.com](http://rssmix.com) permet la fusion en un seul lien de plusieurs de vos flux RSS.

### Suivre les sorties d'épisodes ou d'albums de musique

Je peux suivre les sorties d'albums de mes artistes préférées par le biais de [muspy.com](https://muspy.com/) (disponible aussi en [open-source](https://github.com/alexkay/muspy/)) ou bien les épisodes d'une série avec [showrss.info](https://showrss.info/). Au passage **showrss** fournit les liens **torrent** des épisodes, ce qui est plutôt pas mal si l'on souhaite automatiser le téléchargement de nos séries.

### Voir les mails d'une adresse mail jetable

On peut aussi récupérer les emails d'une boite mail jetable comme [yopmail](http://yopmail.com) qui génère lui aussi des flux RSS.

### Sauvegarder des articles

J'utilise wallabag pour sauvegarder tous mes bookmarks. À chaque fois que je trouve un site, un article ou une vidéo sympa je le bookmark depuis mon navigateur web et il apparait dans mes flux RSS.

```bash
docker run -d --name wallabag -v ~/.wallabag/:/var/wallabag/data -p 9999:80 --restart=always wallabag/wallabag
```

### Aucun flux RSS trouvé

Si vous ne trouvez pas le flux RSS d'un site, vous pouvez chercher dans son code source (CTRL+U), une petite recherche (CTRL+F) sur les mots-clés "atom", "feed" ou "rss" devrait vous permettre de trouver le lien.

Et si un site ne dispose pas de flux RSS, vous pouvez vous-même en créer par le biais de ces deux services :

- [http://feed43.com/](http://feed43.com/)
- [http://fetchrss.com](http://fetchrss.com)

## Conclusion

Vous pouvez bien entendu suivre n'importe quel site d'information comme [mrmondialisation](https://mrmondialisation.org/) ou bien vos subreddit pour ceux qui sont sur [reddit](https://reddit.com/).

De cette manière je peux centraliser tous mes flux d'information et rester informé de l'actualité tout en restant plus ou moins à l’écart de certains services qui ne respectent pas toujours la vie privée de ces utilisateurs. Les possibilités sont nombreuses, si vous avez d'autres tips sur les flux RSS n'hésitez pas à en faire part dans les commentaires.

À lundi prochain pour un nouvel article, bonne semaine ;)