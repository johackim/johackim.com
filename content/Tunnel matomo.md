---
title: Comment créer un tunnel sur matomo ?
permalink: comment-creer-un-funnel-sur-matomo
datePublished: 2020-09-01T06:00
dateUpdated: 2020-09-01T06:00
description: Consultez facilement le parcours et les taux de conversion des actions de vos visiteurs (inscription, achat en ligne, etc..) à l'aide de la fonctionnalité Funnel de Matomo.
aliases:
  - Comment créer un tunnel sur matomo ?
publish: true
rss: true
links:
    - "[[Matomo]]"
---

Consultez facilement le parcours et les taux de conversion des actions de vos visiteurs (inscription, achat en ligne, etc..) à l'aide de la fonctionnalité Funnel de Matomo.

## C'est quoi un tunnel ?

Un tunnel (funnel en anglais) définit une série d'actions que vous attendez de vos visiteurs qu'ils entreprennent pour **atteindre un objectif**.

Exemple : Visiteur -> Follower -> Acheteur

## Comment installer Matomo ?

Matomo, l'**alternative éthique à Google Analytics** peut être [auto-hébergé](https://github.com/matomo-org/matomo), [installé sur leurs serveurs](https://matomo.org/) ou chez un hébergeur comme [Ethibox](https://ethibox.fr/matomo?utm_source=johackim).

Si vous installez la version auto-hébergé de Matomo, vous devez payer 199€ / an pour utiliser le [plugin Funnel](https://plugins.matomo.org/Funnels).

La sécurité et la vie privée de vos utilisateurs ont un prix 😃.

## Comment créer un tunnel ?

### Créer un objectif

Pour créer un tunnel il faut d'abord commencer par créer un objectif.

Quel est l'objectif que vous souhaitez que vos visiteurs atteignent ?

*Exemples : s'inscrire à une newsletter, acheter un produit/service, etc...*

![Créer un objectif sur Matomo](https://i.imgur.com/1a7s4aw.png)

Renseignez l'action qui validera l'objectif depuis le champ **Goal is triggered**.

En général, cela peut être une visite sur une URL en particulier ou un [event matomo](https://fr.matomo.org/docs/event-tracking/).

### Configurer les étapes du tunnel

Si votre objectif est atteignable uniquement après une série d'actions il vous faut configurer les étapes de votre tunnel.

![Créer un tunnel sur Matomo](https://i.imgur.com/iQe0NXN.png)

C'est le même principe que pour la création d'un objectif. Ajoutez chaque action que vos visiteurs effectuent avant d'atteindre l'objectif :

- Visites sur des URLs spécifiques
- [Événements matomo](https://fr.matomo.org/docs/event-tracking/)

Une fois la création de votre tunnel terminé, vous aurez accès à ce genre de données :

![Exemple de tunnel Matomo](https://i.imgur.com/2zXjL5R.png)

Vous avez accès au taux de conversion de chaque action et le pourcentage de visiteurs qui atteignent l'objectif désiré.

Et vous pouvez aussi savoir quelles sources de trafic converties le mieux :

![Sources de trafic](https://i.imgur.com/2uxAyhN.png)

PS: Sachez que Matomo permet l'anonymisation des données. Il est rarement utile de connaitre l'adresse IP ou le nom exact de nos visiteurs dans un contexte analytique.