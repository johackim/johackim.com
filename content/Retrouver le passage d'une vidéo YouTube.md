---
datePublished: 2021-10-06T16:50
dateUpdated: 2021-10-06T16:50
permalink: comment-retrouver-le-passage-dune-video-youtube
aliases:
  - Comment retrouver le passage d'une vidéo YouTube ?
publish: true
rss: true
---

Si comme moi, vous cherchez un passage particulier (ex: une phrase) dans une vidéo d'une chaine YouTube, mais que vous ne le retrouvez pas, voici comment faire pour automatiser la recherche.

Si il s'agit simplement d'une vidéo YouTube, ouvrez le "Transcript" de la vidéo via le bouton avec les trois petits points et recherche votre mot avec le racourcis clavier CTRL+F.

Si vous ne savez pas de quel vidéo il s'agit mais que vous avez que le nom de la chaine YouTube, Il existe un logiciel qui s'appelle [youtube-dl](https://github.com/ytdl-org/youtube-dl) qui vous permet de télécharger des vidéos, mais aussi les sous-titres d'une vidéo.

Du coup, vous pouvez télécharger tous les transcripts d'une chaine YouTube :

```bash
youtube-dl --write-auto-sub --sub-lang <lang> --skip-download <youtube_channel|youtube_video>
```

Puis effectuer une recherche automatique sur les transcripts avec une commande [[Linux]] comme `ag` ou `grep` :

```bash
ag <text>
# ou
grep -rin <text>
```

Comme ça, si vous vous souvenez juste d'une phrase en particulier, mais vous ne retrouvez pas le passage, vous pouvez automatiser votre recherche afin d'aller plus vite 😀.