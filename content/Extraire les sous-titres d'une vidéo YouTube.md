---
datePublished: 2021-06-27T19:19
dateUpdated: 2021-06-27T19:19
permalink: extraire-les-sous-titres-d'une-video-youtube
publish: true
rss: true
note: 58
---

Pour extraire les sous-titres d'une vidéo YouTube, il existe à ma connaissance 2 solutions efficaces.

## Savesubs.com

Vous pouvez vous rendre sur le site [savesubs.com](https://savesubs.com/) et insérer l'URL de votre vidéo YouTube.

Le service vous retournera un fichier au format `.srt` ou `.txt` de votre vidéo à télécharger.

## Youtube-dl

Ou alors, vous pouvez utiliser le logiciel `youtube-dl` accessible en ligne de commande :

```bash
youtube-dl --write-auto-sub --sub-lang <lang> --skip-download <youtube_video>
```

---

Références :

- https://github.com/NotJoeMartinez/yt-fts
- https://filmot.com/