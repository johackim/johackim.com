---
title: 10 étapes pour prototyper et tester un business en ligne en 1 jour
permalink: 10-etapes-pour-prototyper-et-tester-un-business-en-ligne-en-1-jour
datePublished: 2019-01-09T08:00
dateUpdated: 2019-01-09T08:00
description: Aujourd'hui je partage avec vous un ensemble de méthodes pour prototype et vérifier en un jour la viabilité, faisabilité et désirabilité d'un business en ligne.
aliases:
  - Comment créer un prototype ?
publish: true
rss: true
---

Aujourd'hui, je partage avec vous un ensemble de méthodes pour prototyper et tester en un jour la viabilité, faisabilité et désirabilité d'un business en ligne.

## 1. Trouver un point de douleur

Mes projets commencent généralement par un **pain point** ("point de douleur" en français). Il s’agit d'un problème précis, que je rencontre moi ou un segment clientèle précis, et qui ne possède pas encore de solutions viables.

Il est possible de trouver ce **pain point** de plusieurs manières :

- En rencontrant soi-même ce point de douleur
- En observant des personnes dans leur quotidien pour découvrir ce qu'ils désirent. Le but étant de ne pas demander au client ce qu'il veut, mais plutôt de l'observer dans ce qu'il fait. Un outil comme **[la carte d'empathie](http://gamestorming.com/wp-content/uploads/2017/07/Empathy-Map-Canvas-006.pdf)** peut-être utile dans ce contexte d'observation.
- Ou à n'importe quel moment, en lisant un livre, en faisant du sport ou en écoutant un podcast par exemple

![Carte d'empathie](https://i.imgur.com/BJZbmUC.jpeg)

Une fois ce **pain point** trouvé, le premier réflexe, noter cette idée dans un coin et vérifier qu'il ne possède pas de solution viable déjà existante (via [alternativeto](https://alternativeto.net/) ou votre moteur de recherche favoris).

Quand l'idée a pris le temps de mûrir, je passe aux étapes suivantes.

Pas besoin de compétences techniques pour lancer un projet. Un ordinateur, un simple crayon et une feuille suffisent.

## 2. Un business model d'une page

> Votre produit n'est pas le produit. Votre business model c'est le produit.
> **La méthode RUNNING LEAN - Ash Maurya**

Je réalise un **Lean Canvas** ou un **[Business Model Canvas](https://youtube.com/watch?v=QoAOzMTLP5s)**.

Il s'agit d'un **business model** recensé sur une simple feuille de papier, rapide à créer et facilement transportable.

C'est à ce moment que l'on peut vérifier la **viabilité** du projet.

![Lean Canvas](https://i.imgur.com/KWW6JP0.png)

### 2.2. Vérifier l'adéquation de votre produit et le profil client

Il existe un moyen de vérifier de manière plus ou moins précise si votre **proposition de valeur** se trouve en accord avec le **profil client**.

Le canvas **proposition de valeur** créer par [Strategyzer](https://strategyzer.com/) le permet.

[Voici une vidéo](https://youtube.com/watch?v=BFK_WMkshL8) réalisée par un des auteurs du livre si vous souhaitez en savoir plus.

![Value Proposition Canvas](https://i.imgur.com/GnLoLnM.png)

## 3. Une phrase type pour pitcher son projet

Utile pour bien cerner le but du projet et pitcher le projet correctement, je rédige un **Elevator Pitch** sous cette forme :

**Pour***[les personnes ciblées par le produit/le service]*

**qui souhaitent***[formulation du besoin des cibles]*,

**notre produit est***[description du type de produit/service]*

**qui***[description du bénéfice majeur apporté par la solution]*.

**A la différence de***[la concurrence/la pratique actuelle]*

**notre produit permet de***[éléments différenciateurs majeurs]*.

## 4. Le profil client

Un **persona** est une personne fictive à laquelle on assigne certaines caractéristiques (par exemple: âge, métier, aspirations, etc..). Il est censé représenter le profil type de notre solution. Cela permet de mettre au clair les personnes que l'on cible, de savoir à qui l'on s'adresse.

![Persona canvas](https://i.imgur.com/ecMmsdd.jpg)

## 5. Un vocabulaire commun

Les mots ont beaucoup d'importance quand on travaille à plusieurs sur un projet. Pour mieux se comprendre, il peut être utile de disposer d'un **vocabulaire commun**.

On définit et fixe un ensemble de mots qui correspond à notre solution. Ce vocabulaire fera partie intégrante du code source et sera utilisé par toutes les personnes qui participent au projet.

Ce principe se nomme **Ubiquitous Language** et est tiré du livre [Domain Driven Design](https://goodreads.com/book/show/179133.Domain_Driven_Design).

## 6. Les maquettes graphiques

Pour rapidement créer des **mockups** (maquette d'une interface utilisateur), vous pouvez utiliser un outil comme [balsamiq](https://balsamiq.com/).

Et si vous avez des notions en développement web, il est parfois plus rapide de directement prototyper votre solution sur [codepen.io](https://codepen.io/) ou [codesandbox.io](https://codesandbox.io).

Sinon, une simple feuille et un crayon peuvent suffire.

![Balsamiq mockup](https://i.imgur.com/OUL8a0h.png)

## 7. Le parcours utilisateur

Définir le chemin que va parcourir l'utilisateur permet d'avoir une **vue d'ensemble** de l'application, et de rapidement se rendre compte si la solution assure une **bonne expérience utilisateur** ou pas.

Un exemple de bonne expérience utilisateur serait par exemple de suivre la [règle des trois clics](https://wikiwand.com/fr/R%C3%A8gle_des_trois_clics).

De mon côté, je le crée sous la forme d'un **diagramme d'activité**. Ça ressemble à ça :

![Exemple de parcours utilisateur](https://i.imgur.com/smx9Ayv.png)

## 8. Une mini architecture technique

Pour vérifier la **faisabilité** technique du projet, je réalise une mini **architecture technique**. C'est l'étape où je réfléchis à ce que je vais utiliser comme langage de programmation, framework et librairies. Généralement, je définis ce genre de composants :

- La partie **Front-End**, les librairies et frameworks utilisés pour développer les interfaces utilisateur.
- La partie **Back-End**, tout ce qui se trouve côté serveur.
- La **base de données**, quel type de base de données.
- Quels **serveurs** vont être utilisés et chez quel **hébergeur**, sous quel système d'exploitation et avec quelle configuration matérielle. Dorénavant, je passe par [ma propre infrastructure Ethibox](https://ethibox.fr/?utm_source=johackim).

Je réalise généralement cette **architecture technique** à l'aide de [draw.io](https://draw.io), mais encore une fois, un crayon et une feuille suffisent.

## 9. Le produit minimum viable

Pour ne pas partir dans un développement technique interminable, il est souvent préférable de se limiter à un simple **MVP** (produit minimum viable).

Un MVP peut se présenter sous la forme d'une **landing page** (page de capture avec un appel à l'action), d'une simple **vidéo** ou les deux.

Elle doit se présenter comme l'unique solution à l'unique problème de votre unique segment de clientèle.

**Note pour les développeurs** : Dans le cas d'un projet avec comme cible des développeurs, j'ai tendance à écrire un simple fichier README.md que je publie sur Github page avec Docsify. Le résultat est plutôt joli et ça permet de suivre une logique de [RDD](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html).

## 10. La phase de test

La dernière étape consiste à partager le projet, récupérer un maximum de **feedbacks**, et vérifier si notre solution répond réellement et correctement à un problème existant. C'est à ce moment que sera dévoilée la **désirabilité** du projet.

De manière plus concrète :

### On apporte un maximum de valeur sur le sujet du projet aux personnes concernées

On évite de cibler tout le monde, on cherche une source de trafic et on apporte un maximum de valeur à ces personnes afin de leur faire découvrir notre solution.

### On demande aux personnes concernées et intéressées si elles souhaitent s'inscrire au projet

Pour ça, il faut que le projet soit suffisamment attractif et persuasif.

Évidemment, on respecte la **vie privée**, on évite de jouer avec les emails des gens, et **on ne partage aucune information à des tiers**.

Personnellement je n'utilise pas de solution SaaS comme Google Analytics, MixPanel ou ClickFunnels. Aucune information ne sort de [mon infrastructure](https://ethibox.fr).

### On demande un maximum de feedback à ces personnes

On privilégie les questions ouvertes tout en restant à l'écoute, le but n'étant pas de chercher à vendre le produit, mais plutôt de l'améliorer selon les besoins réels des utilisateurs.

On peut poser des questions du type :

- "Quel est votre plus gros problème avec ce [domaine] ?"
- "Comment vous sentiriez-vous si vous ne pouviez plus utiliser ce produit ?"
- "Quelle solution utilisez-vous actuellement pour résoudre ce problème ?"

### On mesure les metrics en s'inspirant du framework AARRR

- **A**cquisition : Comment les visiteurs vous trouvent ?
- **A**ctivation : Première expérience de l’utilisateur
- **R**etention : L’utilisateur revient-il ?
- **R**eferral : Est-ce que vos utilisateurs sont suffisamment contents pour en parler autour d’eux ?
- **R**evenue : Comment gagnez-vous de l’argent ?

### On fait évoluer le projet en fonction des enseignements

À partir de là, je pense qu'**il faut plus d'un jour** pour tirer suffisamment d'enseignements. Si le **taux de rétention** est élevé, et que **40%** de vos utilisateurs déclarent qu'ils seraient très déçus s’ils ne pouvaient plus utiliser votre produit (**[[Test de Sean Ellis]]**), alors vous pouvez passer à l'**étape de conception**. Je parlerai de cette étape dans un prochain article.

Dans le cas contraire, je réitère ce processus de 10 étapes, je créer des hypothèses, et je valide ou non ces hypothèses en fonction des enseignements (metrics et feedbacks).

L'idéal pour votre produit serait qu'il réponde correctement à ces 3 axes (**viabilité**, **faisabilité** et **désirabilité**), en un minimum de temps et sans dépenser trop d'argent.

![Viabilité + faisabilité + désirabilité = solution idéale](https://i.imgur.com/nWyBqbN.png)

## Conclusion

Cet article a été réalisé dans le contexte où l'on travaille seul en tant qu'**entrepreneur indépendant**. Quand on travaille seul, on prend le temps de chercher, de trouver son inspiration et de réfléchir.

Cependant, il est tout à fait possible de réaliser ces même étapes avec plusieurs personnes (un **Scrum Master**, un **Product Owner**, un ou plusieurs **développeurs**, etc...).

Théoriquement, si **vous avez déjà une idée** qui a pris le temps de mûrir, que vous êtes quelqu'un de très **productif**, que vous avez les **bons outils**, une bonne **expérience** et que vous avez déjà **automatisé** certains process au préalable, je pense qu'il est possible d'avoir des résultats très intéressant en **1 jour**, surtout si vous passez une grande partie de cette journée sur la **phase de test**.

J'ai essayé d'être le plus **bref** possible dans cet article, je vous conseille de lire les ressources ci-dessous si vous souhaitez aller plus loin.

N'hésitez pas à **partager en commentaire** quels sont vos process à vous ;)

---

Références :

- [Sprint. Résoudre les problèmes et trouver de nouvelles idées en cinq jours](https://placedeslibraires.fr/livre/9782212566062).
- [La méthode Running Lean - Comment transformer votre idée en succès](https://placedeslibraires.fr/livre/9782354561239)
- [Value Proposition Design - Comment créer les produits et les services que veulent vos clients](https://placedeslibraires.fr/livre/9782744066313)
- [Business model nouvelle génération](https://placedeslibraires.fr/livre/9782744064876)
- [The Lean Startup](https://placedeslibraires.fr/livre/9780670921607)
- [Tout le monde n'a pas eu la chance de rater ses études](https://placedeslibraires.fr/livre/9791092928228)
- [Le processus d'initialisation des projets chez Marmelab](https://marmelab.com/blog/2017/01/17/initialisation-des-projets.html)
- [Readme Driven Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html)
- https://kitted.app/action/paper-prototype/0040