---
datePublished: 2021-06-27T19:19
dateUpdated: 2021-06-27T19:19
permalink: creer-un-ebook-a-partir-d'un-fichier-markown
publish: true
rss: true
note: 67
---

Pour créer un ebook à partir d'un fichier markdown, il est possible d'utiliser Pandoc sur [[Linux]].

## Installation de Pandoc sur Linux

Sur Ubuntu et Debian :

```bash
apt update && apt install -y pandoc texlive texlive-latex-extra
```

Sur Arch Linux :

```bash
pacman -S --noconfirm pandoc texlive-bin texlive-core
```

## Création d'un ebook au format epub

```bash
pandoc input.md -o output.epub
```

## Création d'un ebook au format pdf

```bash
pandoc input.md -o output.pdf
```

## Création d'un ebook au format mobi

```bash
pandoc input.md -o output.mobi
```

## Création d'un ebook avec Docker

```bash
docker run -it -v $PWD:/mnt pandoc/core input.md -o /mnt/output.mobi
```

## Ajouter une cover

Pour ajouter une cover :

```bash
pandoc input.md --epub-cover-image cover.png -o output.epub
```