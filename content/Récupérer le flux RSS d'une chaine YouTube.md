---
datePublished: 2021-08-29T19:14
dateUpdated: 2021-08-29T19:14
permalink: recuperer-le-flux-rss-dune-chaine-youtube
publish: true
rss: true
note: 55
---

Pour récupérer le flux RSS d'une chaine YouTube, prennez l'URL de votre chaine YouTube et convertissez le comme ceci :

```bash
# Exemple avec la chaine YouTube HugoDécrypte
https://youtube.com/channel/UCAcAnMF0OrCtUep3Y4M-ZPw (Lien Original)
https://youtube.com/feeds/videos.xml?channel_id=UCAcAnMF0OrCtUep3Y4M-ZPw (Flux RSS)

# Exemple avec la chaine de Sofyan
https://youtube.com/user/sofyanfaitducinema (Lien Original)
https://youtube.com/feeds/videos.xml?user=sofyanfaitducinema (Flux RSS)
```

Dans le premier exemple, il suffit de reprendre l'identifiant de la chaine (`UCAcAnMF0OrCtUep3Y4M`) et de le placer à la fin de cette URL : `https://youtube.com/feeds/videos.xml?channel_id=`.

Dans le second exemple, il faut prendre le nom d'utilisateur de la chaine `sofyanfaitducinema` et le placer à la findde cette URL : `https://youtube.com/feeds/videos.xml?user=`.

Voilà ! 😀

---

Références :

- [[RSS]]