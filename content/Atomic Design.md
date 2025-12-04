---
title: Atomic Design
permalink: atomic-design
publish: true
rss: true
description: Découvrez l'Atomic Design, une méthode pour concevoir des interfaces utilisateur cohérentes, hiérarchisées et réutilisables pour le web et les applis.
dateUpdated: 2023-03-06T18:11
datePublished: 2023-03-06T18:11
---

L'Atomic Design est une méthode de conception de produits numériques qui divise les éléments d'interface utilisateur en :

- "atomes" (éléments les plus petits et fondamentaux)
- "molécules" (groupes d'atomes)
- "organismes" (groupes de molécules)
- "templates" (pages entières)

C'est un modèle mental pour penser les interfaces utilisateur comme un système de composants interconnectés et hiérarchisés.

Cette approche permet de créer des systèmes de design cohérents et réutilisables pour les sites web et les applications.

## 1. Atomes

Les atomes sont les éléments les plus petits et les plus simples de l'interface utilisateur, tels que :

- Les labels
- Les inputs
- Les boutons
- Les icônes
- Les typographies
- Les couleurs
- Les bordures
- Les fonds

Ces atomes incluent des [éléments HTML de base](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) qui ne peuvent plus être décomposés sans cesser d'être fonctionnels.

## 2. Molécules

Les molécules sont des groupes d'atomes qui travaillent ensemble pour créer des fonctionnalités plus complexes.

Exemples :

- Un formulaire de connexion (Username input + Password input + Button)
- Une barre de navigation (Link + Link + Link)

## 3. Organismes

Groupes de molécules rassemblé ensemble pour former une section d'une interface.

Exemples :

- Un header (Icon + navbar)
- Un footer (Icon + navbar)

## 4. Templates

Exemples :

- Une homepage (Header + Hero + Footer)

## 5. Pages

C'est le rendu finale qui contient les templates avec les données réels du site internet en ligne.

---

Références :

- [[Design]]
- [[Design system]]
- [Grafikart.fr - Organiser son projet JavaScript](https://youtu.be/x1YstBqmYxA?t=980)
- [Basti Ui - LE DESIGN ATOMIQUE - C'est quoi l'Atomic ?](https://youtu.be/K8fIVThMGaw?t=111)
- https://bit.dev/
- https://storybook.js.org/
- https://bradfrost.com/blog/post/atomic-web-design/
- https://antfu.me/posts/reimagine-atomic-css