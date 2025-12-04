---
datePublished: 2021-09-16T22:10
dateUpdated: 2021-09-16T22:10
permalink: extraire-les-sous-titre-dune-video-mkv
publish: true
rss: true
note: 45
---

Pour extraire les sous-titres d'une vidéo MKV, il existe le package `mkvtoolnix-cli` :

```bash
sudo pacman -S mkvtoolnix-cli
```

Une fois installé, vous pouvez récupérer la liste numéroté des pistes vidéos et des sous-titre avec la commande suivante :

```bash
mkvinfo How.to.Sell.Drugs.Online.Fast.S03E01.MULTi.1080p.WEB.x264-ALLDAYiN.mkv

# Ou

mediainfo How.to.Sell.Drugs.Online.Fast.S03E01.MULTi.1080p.WEB.x264-ALLDAYiN.mkv
```

Trouvez le numéro de la piste (ex: `5`) de sous-titres que vous voulez extraire et exécutez la commande :

```bash
mkvextract tracks How.to.Sell.Drugs.Online.Fast.S03E01.MULTi.1080p.WEB.x264-ALLDAYiN.mkv 5:How.to.Sell.Drugs.Online.Fast.S03E01.MULTi.1080p.WEB.x264-ALLDAYiN.srt
```

Voilà ! 😀