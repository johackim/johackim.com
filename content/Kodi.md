---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: kodi
publish: true
rss: true
note: 61
---

Kodi (anciennement XBMC) est un lecteur multimédia libre qui tourne nativement sur les systèmes d’exploitation BSD, Raspbian, GNU/Linux, Mac OS X, Microsoft Windows, Android et iOS.

## Installer un dépôt sur Kodi

Un dépôt ou repository regroupe une sélection d'extensions (ou add-ons), que vous pouvez installer directement depuis l'application Kodi. Vous n'avez donc pas besoin de chercher add-on par add-on, tout est regroupé dans un dépôt ou repository.

Le plus connu de tous c'est [SuperRepo](https://superrepo.org/) qui compte pas moins de 5000 add-ons.

Pour ajouter un dépôt :

1. Rendez-vous dans Système (la petite icône engrenage en haut à gauche)
2. Dans le gestionnaire de fichiers
3. Appuyer sur "Ajouter une source"
4. Ajouter l'adresse : http://srp.nu là où il y a marqué "aucun", et donnez-lui un nom (ex : "SuperRepo").
5. Rendez-vous ensuite dans Système → Extensions
6. Appuyer sur "Installer depuis un fichier zip"
7. Sélectionnez votre source précédemment nommée "SuperRepo" → Krypton → all → `superrepo.kodi.krypton.all-0.7.04.zip`

Voilà ! Maintenant vous pouvez parcourir toutes les extensions et prendre celles dont vous avez besoin depuis le menu Système → Extensions → Installer depuis un dépôt → SuperRepo.

Cette installation fonctionne avec SuperRepo de la même façon que n'importe quel autre dépôt 😉

PS : Pour supprimer l'icône thermomètre, ajoutez le paramètre `avoid_warnings=1` dans le fichier `/boot/config.txt`.

PS2 : Si vous n'arrivez pas à installer l'Add-on YouTube, exécutez la commande `sudo apt install -y kodi-inputstream-adaptive`

<!-- ignore -->

Pour éviter les erreurs "Lost websocket connection" de Chorus, activer le paramètre "Allow remote control from applications on other systems".

## Bug "Can not initialize OpenGL context" et "Unable to init rendering system"

Le seul moyen que j'ai trouvé pour résoudre ce problème c'est d'utiliser [[Flatpak]] :

```bash
flatpak install flathub tv.kodi.Kodi
flatpak run tv.kodi.Kodi
```

---

J'ai une erreur de bar verte lorsque je regarde une vidéo sur Kodi via la distribution Dietpi.

Je n'ai pas trouvé de fix pour le moment.

---

Références :

- https://troypoint.com