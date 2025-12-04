---
datePublished: 2021-06-27T19:19
dateUpdated: 2021-06-27T19:19
permalink: tester-les-touches-de-son-clavier-sur-linux
publish: true
rss: true
---

Pour tester et vérifier que les touches de son clavier fonctionne correctement, il existe un outil sur [[Linux]] du nom de `xev`, pour l'installer, exécutez la commande suivante :

```bash
apt update && apt -yq install xorg-xev
```

Pour le lancer :

```bash
xev
```

Appuyez ensuite sur les touches de votre clavier pour vérifier si votre ordinateur les prend bien en compte.

Très utile lorsque certaines touches de son clavier sont dysfonctionnelles 😀.

---

Références :

- [[Linux]]