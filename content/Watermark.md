---
datePublished: 2021-08-15T19:41
dateUpdated: 2021-08-15T19:41
title: Comment supprimer un watermark ?
permalink: watermark
publish: true
rss: true
---

Certain PDF contient un watermark, quand il est répété un mode texte sur toutes les pages du PDF, il est possible de le supprimer depuis un ordinateur sous [[Linux]].

J'ai créé [un petit script maison](https://github.com/johackim/dotfiles/blob/master/.local/bin/unwatermark.sh) qui utilise les librairies `qpdf` et `pdftk`.

```bash
!/bin/bash

if [[ -z "$1" || -z "$2" || ! -f "$1" ]]; then
    echo "usage: unwatermark [file] [text to remove]"
    exit 1
fi

FILE=$1
TEXT_TO_REMOVE=$2
OUTPUT_PATH="fixed.pdf"

qpdf --stream-data=uncompress "$FILE" uncompressed.pdf
sed -e "s/$TEXT_TO_REMOVE/ /" uncompressed.pdf > unwatermarked.pdf
pdftk unwatermarked.pdf output "$OUTPUT_PATH" compress
cp -f "$OUTPUT_PATH" "$FILE"
rm -f unwatermarked.pdf uncompressed.pdf fixed.pdf
```

Exemple, pour un fichier qui se nomme `example.pdf` :

```bash
unwatermark.sh <file.pdf> <texte-a-supprimer>
```

Voilà, le watermark est supprimé ! 😀

PS : [Cliquez-ici si vous souhaitez supprimer le watermark d'une vidéo](https://online-video-cutter.com/fr/remove-logo).

PS2: Il est possible d'utiliser [Master PDF Editor](https://code-industry.net/masterpdfeditor/) et d'aller dans le menu Document > Watermark -> Delete pour supprimer un watermark ;)

PS3 : Vous pouvez aussi utiliser [Swifdoo](https://swifdoo.com/) sur Windows depuis le menu Advanced > Watermark

---

Références :

- https://watermarkremover.io/fr/upload