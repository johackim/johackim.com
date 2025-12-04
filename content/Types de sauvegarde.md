---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: types-de-sauvegarde
title: Les différents types de sauvegarde
publish: true
rss: true
---

## Sauvegarde complète

Une sauvegarde complète est une copie totale de l'ensemble des données.

Chaque fois que vous effectuez une sauvegarde complète, vous stockez entièrement et une nouvelle fois la source de données.

## Sauvegarde incrémentale

La sauvegarde incrémentale effectue d'abord une première copie complète de toutes vos données et chaque sauvegarde qui vient après permet d'enregistrer les modifications apportées depuis la dernière sauvegarde.

Contrairement à la sauvegarde complète, la sauvegarde incrémentale est très rapide à réaliser, mais plus lente à la restauration. Elle possède aussi l'avantage d'utiliser peu de quantité de stockage. Ce sera cette méthode que vous utiliserez avec la plupart des systèmes de stockage en ligne.

## Sauvegarde différentielle

Une sauvegarde différentielle est une sauvegarde cumulative de tous les fichiers modifiés depuis la dernière sauvegarde.

Comme avec la sauvegarde incrémentale, la différentielle va effectuer une copie initiale et complète de tous vos fichiers et dossiers. Mais les prochaines sauvegardes vont permettre de stocker tous les changements apportés depuis votre dernière sauvegarde complète.

Ce type de sauvegarde permet d'enregistrer les données plus rapidement que la sauvegarde complète et demande aussi moins d'espace. Quant à la restauration, elle est plus rapide que celle de la sauvegarde incrémentale qui nécessite moins d'espace de stockage.

## Sauvegarde mirroir

La sauvegarde miroir réalise une copie conforme des fichiers de votre système. Elle s'effectue ponctuellement et prend en compte l'ensemble des données sources telles qu'elles existaient lors de la dernière sauvegarde.

Ce procédé a l'avantage de proposer une restauration rapide et ne contient pas de fichiers anciens ou obsolètes.

---

Références :

- https://netexplorer.fr/blog/quels-sont-les-differents-types-de-sauvegardes