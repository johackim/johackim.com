---
datePublished: 2021-08-08T19:31
dateUpdated: 2021-08-08T19:31
permalink: nettoyer-son-ordinateur-sur-linux-avec-bleachbit
title: Nettoyer son ordinateur sur Linux avec BleachBit
publish: true
rss: true
aliases: [Ccleaner]
---

Pour nettoyer mon ordinateur sous Linux, j'utilise [BleachBit](https://bleachbit.org/).

## Comment installer Bleachbit ?

Pour installer Bleachbit sur Arch Linux, exécutez la commande ci-dessous :

```bash
sudo pacman -S bleachbit
```

Pour l'installer sur Debian ou Ubuntu :

```bash
sudo apt install -y bleachbit
```

## Comment utiliser Bleachbit ?

Une fois installé, lancez `bleachbit`.

Avant de démarrer un nettoyage, pensez à décocher le paramètre "Free Disk Space" qui prend beaucoup trop de temps à s'exécuter.

Une fois les paramètres définis, vous pouvez soit démarrer le nettoyage via l'interface graphique, soit via cette ligne de commande :

```bash
sudo -E bleachbit --preset --clean
```

## Supprimer l'espace libre de votre disque dur

Si vous souhaitez supprimer l'espace libre de votre disque dur afin d'être sûr que vos données effacées soit irrécupérables, exécutez la commande suivante :

```bash
sudo -E bleachbit -w /
```

## Alternatives à BleachBit

- [Microsoft PC Manager](https://pcmanager.microsoft.com/en-us) (nouveau)
- [CCleaner](https://ccleaner.com/) (uniquement sur Windows ou MacOS)
- [Czkawka](https://github.com/qarmin/czkawka)