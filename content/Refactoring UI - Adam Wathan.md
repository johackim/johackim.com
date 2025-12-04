---
datePublished: 2021-10-06T16:50
dateUpdated: 2021-10-06T16:50
title: Résumé du livre Refactoring UI de Adam Wathan
permalink: refactoring-ui-adam-wathan
publish: true
rss: true
tags:
  - literature
note: 82
---

> [!INFO]
> Contenu en cours de création

## Démarrez avec une fonctionnalité

Ne démarrez pas avec une mise en page (un layout). Vous faites une erreur si vous commencez par vous demander quelle va être votre barre de navigation ou votre footer.

Par exemple, si vous créez un système de réservation de billet d'avion, vous pouvez commencer par créer une fonctionnalité "Recherche de vols" :

- Un champ pour la ville de départ
- Un champ pour la ville de destination
- Un champ pour la date de départ
- Un champ pour la date de retour
- Un bouton pour effectuer la recherche

![|400](https://i.imgur.com/fh9TORr.png)

## Les détails viennent plus tard

Ignorer les détails dans un premier temps (les couleurs, polices, ombres, icons, etc...).

**Commencez vos interfaces uniquement avec des niveaux de gris**.

![|400](https://i.imgur.com/TGPzhyU.png)

**Petit hack** : Créez votre maquette sur papier avec un feutre épais pour se forcer à ignorer les détails.

![|400](https://i.imgur.com/vX642TQ.png)

## Choisir une police de caractère

Si vous voulez un site classique, utilisez une font avec serif. Si vous voulez un site un peu moins sérieux, utilisez une font sans serif.

## Choisir une couleur

Une couleur Gold (or) donnera une impression de luxe tandis qu'une couleur rose donnera une impression plus fun et moins sérieux.

## Choisir une border radius

Des boutons avec une bordure sans rayon sera plus sérieux que l'inverse.

## Choisir un language

Quel ton utilisez-vous ? Un ton amicale/personnel ou un ton professionnel ?

L'utilisation d'un ton moins personnel peut donner une impression plus officielle ou professionnelle.

Tandis que l'utilisation d'un langage plus convivial et plus décontracté donne au site un aspect plus agréable.

## Analyser les sites que votre audience visite

La plupart du temps, vous aurez probablement juste une intuition pour la personnalité que vous recherchez.

Mais si ce n'est pas le cas, un excellent moyen de simplifier la décision consiste à jeter un coup d'œil aux autres sites utilisés par les personnes que vous souhaitez atteindre.

## Définissez un système à l'avance

Limitez vos choix lorsque vous créez votre design. Au lieu de décider à chaque fois quelles couleur, police ou taille de bordure utiliser, créez-vous un système à l'avance avec un nombre de choix limité pour tous vos éléments :

- Font size
- Font weight
- Line height
- Color
- Margin
- Padding
- Width
- Height
- Box shadows
- Border radius
- Border width
- Opacity
- Etc...

## Hiérarchie visuelle

Tous les éléments ne sont pas égaux. Quand tous les éléments sont en compétition pour attirer l'attention, cela rend le design bruyant et chaotique.

![|400](https://i.imgur.com/xG9p1jc.png)

La [[Hiérarchie visuelle]] fait référence à l'importance des éléments d'une interface les uns par rapport aux autres.

Lorsque vous minimisez délibérément les informations secondaires et tertiaires, et que vous faites l'effort de mettre en valeur les éléments les plus importants, le résultat est immédiatement plus agréable, même si la palette de couleurs, le choix de la police et la mise en page n'ont pas changé.

![|400](https://i.imgur.com/7Km1B2B.png)

## Accentuez en désaccentuant

Parfois, vous pouvez vous retrouver dans une situation où vous ne pouvez plus accentuer (empathize en anglais) un élément.

![|400](https://i.imgur.com/qC6PnKe.png)

Pour régler ce problème, vous pouvez désaccentuer les éléments qui sont en compétition autour du vôtre.

![|400](https://i.imgur.com/KUStwdS.png)

Autre exemple avec une sidebar :

![|400](https://i.imgur.com/Vr13q71.png)

## Les labels sont secondaires

Dans beaucoup de situations, les labels sont inutiles.

![|400](https://i.imgur.com/aBSHApV.png)

Le format ou le contexte de l'information suffit déjà a clarifier le type d'information.

![|400](https://i.imgur.com/gdcU3nm.png)
![|400](https://i.imgur.com/7i5Mz4s.png)
![|400](https://i.imgur.com/hJyOb0I.png)
![|400](https://i.imgur.com/wDUbNX2.png)