---
datePublished: 2021-05-30T19:50
dateUpdated: 2023-07-04T10:00
permalink: telecharger-les-videos-de-l'espace-membre-d'un-site
publish: true
rss: true
aliases:
  - youtube-dl
  - yt-dlp
  - Télecharger les vidéos de l'espace membre d'un site
note: 59
---

Pour télécharger les vidéos de l'espace membre d'un site, il suffit de se connecter au site, de reprendre le cookie puis d'utiliser [yt-dlp](https://github.com/yt-dlp/yt-dlp) (ou [youtube-dl-gui](https://mrs0m30n3.github.io/youtube-dl-gui/)).

1. Installez l'extension Firefox [cookies.txt](https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/) ou l'extension Chrome [Get cookies.txt](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc/).

2. Connectez-vous à l'espace membre du site en question.

3. Exécutez la commande suivante :

```bash
yt-dlp --cookies cookies.txt -f hd_mp4-720p <url>
```

NOTE : Il existe aussi le paramètre `--cookies-from-browser chromium` pour reprendre automatiquement les cookies du navigateur.

S'il y a beaucoup de vidéos, vous pouvez parser le site afin de reprendre toutes les URLs dans un fichier texte (ex: `urls.txt`) puis exécuter la commande suivante :

```bash
for url in $(cat urls.txt); do yt-dlp --cookies cookies.txt $url; done;
```

NOTE : Il est aussi possible de coupler `yt-dlp` avec [[Puppeteer]] pour parser et télécharger toutes les vidéos de l'espace membre d'un site internet automatiquement.

Et si vous voulez télécharger les vidéos en provenance de vimeo.com voici la commande a exécuter :

```bash
yt-dlp --referer <referer> https://player.vimeo.com/video/<id>
```

Pour installer yt-dlp sur Android :

```bash
termux-setup-storage
pkg update && pkg upgrade
pkg install libexpat openssl python
pip install -U yt-dlp
pkg install ffmpeg
```

Pour forcer le téléchargement au format mp4 :

```bash
yt-dlp --merge-output-format mp4 <url>
```

Pour forcer le téléchargement en 480p :

```bash
yt-dlp -f 'bestaudio+bestvideo[height<=480]/best[height<=480]' <url>
```

En 720p :

```bash
yt-dlp -f 'bestaudio+bestvideo[height<=720]/best[height<=720]' <url>
```

Pour télécharger un audio en particulier (ex: fr) :

```bash
yt-dlp -f 'bestaudio[language=fr]' <url>
```

Pour télécharger un sous-titre :

```bash
yt-dlp --convert-subs srt --write-subs --sub-lang en --skip-download <url>
```

Pour télécharger une liste d'urls :

```bash
yt-dlp -a urls.txt
```