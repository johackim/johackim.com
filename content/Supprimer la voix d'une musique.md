---
title: Supprimer la voix d'une musique
permalink: supprimer-voix-musique
datePublished: 2021-01-07T08:00
dateUpdated: 2021-01-07T08:00
description: Je viens de découvrir un outil open-source créé par Deezer qui s'appelle spleeter. Il permet de supprimer le chant d'une musique.
publish: true
rss: true
---

Je viens de découvrir un outil open-source créé par Deezer qui s'appelle [spleeter](https://github.com/deezer/spleeter). C'est assez surprenant, il permet de supprimer le chant d'une musique.

La manière la plus simple d'utiliser l'outil est de lancer une commande Docker :

```bash
docker run -it -v ~/Music:/mnt researchdeezer/spleeter separate -i /mnt/input.mp3 -p spleeter:2stems -o /mnt/output.mp3
```

Vous pouvez à la fois supprimer le chant d'une musique, mais vous pouvez quand même garder le chant dans un fichier à part.

En fait ça peut spliter les différentes pistes d'une musique, la basse, guitare, le chant, le batterie ect..

Spleeter a été conçu avec un outil de machine learning du nom de [TensorFlow](https://github.com/tensorflow/tensorflow).

C'est assez marrant de voir [Manau chanter sans musique](https://voca.ro/11mUKSVV1m4y) 😂.

Bref, vous pouvez trouver [le projet sur Github](https://github.com/deezer/spleeter).

PS : Il existe maintenant [un autre projet](https://github.com/Anjok07/ultimatevocalremovergui) pour dissocier la voix et l'instrumental d'une musique.