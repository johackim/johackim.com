---
datePublished: 2021-07-18T19:21
dateUpdated: 2021-07-18T19:21
permalink: travailler-en-deep-work-sur-linux
publish: true
rss: true
---

Pour travailler en [[Deep Work]] sur [[Linux]], je me suis créé [un script maison](https://github.com/johackim/dotfiles/blob/85175e7d30e6f673bf73b47a62b0aa6574509351/bin/lock).

Ce script a pour but de m'empêcher d'avoir accès à des sites (ex: Youtube, Twitter, ect...) et applications spécifiques (Signal, Mailspring, etc...) qui m'empêchent d'être productif.

L'avantage de ce script, c'est qu'il m'empêche aussi de débloquer l'accès avec le compte root.

Ajoutez les sites et les applications que vous souhaitez bloquer à l'intérieur du script dans les variables `DOMAINS` et `APPS`.

**ATTENTION : Les commandes suivantes bloquera votre accès au groupe sudo pendant 1 heure, veuillez utiliser ce script uniquement en connaissance de cause**.

Puis exécuter le script avec la commande suivante pour :

```bash
sudo -E lock
```

Vous pouvez choisir le nombre d'heures :

```bash
sudo -E lock 3 # Travailler en deep work pendant 3 heures
```

Si vous voulez savoir combien de temps il reste avant de pouvoir réutiliser votre ordinateur, vous pouvez taper la commande `lock status`.

Et n'oubliez pas d'ajouter la commande `lock reset` dans une tâche cron qui s'exécute chaque minute pour pouvoir vous débloquer l'accès automatiquement.

```crontab
* * * * * lock reset
```