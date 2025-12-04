---
title: Comment débugger un problème de manière efficace ?
permalink: comment-debugger-un-probleme-de-maniere-efficace
datePublished: 2019-01-20T08:00
dateUpdated: 2019-01-20T08:00
description: Aujourd'hui, je partage avec vous mon processus pour résoudre des problèmes en apparence complexe, mais qui peuvent se résoudre facilement si l'on utilise la bonne méthode.
aliases:
  - Comment débugger un problème de manière efficace ?
publish: true
rss: true
note: 74
---

Aujourd'hui, je partage avec vous mon processus pour résoudre des problèmes en apparence complexes, mais qui peuvent se résoudre facilement si l'on utilise la bonne méthode.

Je me suis souvent retrouvé face à des **problèmes techniques** en apparence **très complexes** et qui m'ont demandé parfois des dizaines d'heures pour les résoudre... Face à la **complexité** de certains problèmes, j'ai passé mon temps à :

- Faire des suppositions plutôt qu'à isoler le problème pour mieux le comprendre.
- Copier-coller bêtement le problème sur un moteur de recherche sans poser le problème sur papier de manière claire et précise.
- Faire des va-et-vient, et réparer le problème de manière temporaire plutôt que le résoudre à la source et de manière définitive.

Récemment, j'ai réussi à réparer un problème qui arrivait de manière récurrente et aléatoire sur [mon infrastructure web](https://ethibox.fr).

Du coup, j'en profite pour créer et partager avec vous une sorte de procédure sous la forme d'une **checklist de 5 étapes** à réaliser dans l'ordre :

1. Je supprime le superflu et réduis mon environnement de travail le plus possible pour **isoler le problème**
2. Je trouve le moyen de **reproduire ce problème** à tous les coups (minimum 5 à 10 fois d'affilées) et avec le moins d'étapes possible
3. Si l'erreur ne se reproduit pas à tous les coups, je reviens à l'étape 1 dans le but de **supprimer les comportements aléatoires**
4. Une fois le problème correctement isolé et facilement reproductible, je rédige sur papier une **description précise et détaillée** du problème, comme si je m'adressai à un collègue
5. Enfin, après avoir **collecté toutes les données** en lien avec le problème, je tente de résoudre le problème (avec des recherches internet ci-besoin). Sinon je **délègue** le bug à quelqu'un d'autre en prenant soin de lui donner tout ce que je sais sur celui-ci.

Pour résumer, pour résoudre un bug, il faut simplement **isoler notre problème** dans un **environnement minimal**, le **reproduire** au moins 10 fois, **collecter un maximum de données** et **décrire notre problème sur papier**. De cette façon, **on améliore notre compréhension** du problème afin de mieux le résoudre.

Je suis quelqu’un de très visuel et le simple fait d'écrire le problème sur papier m'aide beaucoup à le résoudre.

Il existe aussi la méthode [**Rubber Ducking**](http://wiki.c2.com/?RubberDucking) qui consiste à placer un canard en caoutchouc près de soi et de lui décrire le problème. Le fait de dire votre problème à haute voix rendra la solution plus claire.

Je ferai prochainement un article sur l'utilisation de la commande `git bisect run`, qui permet d'**automatiser** plus ou moins le processus de debug.

---

Références :

- [Ressource supplémentaire](https://web.archive.org/web/20170815171118/makinggoodsoftware.com/2009/06/14/7-steps-to-fix-an-error/)
- https://stackoverflow.com/help/minimal-reproducible-example