---
title: Installer LineageOS sur un Samsung Galaxy J3 2016 SMJ320FN
permalink: installer-lineage-os-sur-un-samsung-galaxy-j3-2016
datePublished: 2020-09-10T06:00
dateUpdated: 2020-09-10T06:00
description: Petit tutoriel rapide sur l'installation de Lineage OS sur un smartphone Samsung Galaxy J3 2016 SMJ320FN.
publish: true
rss: true
links: "[[Android]]"
---

Voici un petit tutoriel rapide sur l'installation de Lineage OS sur un smartphone Samsung Galaxy J3 2016 SMJ320FN.

**NOTE IMPORTANTE** : Avant d'installer Lineage, **pensez à sauvegarder les données de votre téléphone** et de le charger à 80% de batterie.

Téléchargez le [custom recovery Team Win Recovery Project](https://drive.google.com/file/d/10eGbJTAnb1BXNjPfJExPAwvJLK2hcueI/view) (TWRP).

Démarrez votre téléphone en gardant appuyé les boutons volume bas, home et power.

Une fois démarré, branchez votre téléphone en USB et lancez la commande Linux :

```bash
heimdall flash --RECOVERY recovery.img
```

Rebootez votre téléphone avec le mode recovery avec les touches Volume Haut, home et power appuyé lors du démarrage.

Supprimez toutes les données du téléphone avec la fonction wipe et installez la [ROM Lineage OS](https://drive.google.com/file/d/1yRGFXb1n_cDOI3gBbuPr7YiKDK3ivrQP/view) qui a été copié sur votre carte SD.

Pour plus d'infos sur la procédure vous pouvez vous rendre [sur le post original](https://forum.xda-developers.com/galaxy-j3-2016/development/rom-lineageos-14-1-samsung-galaxy-j3-t3667015) (en anglais).

PS: Je n'ai pas réussi à trouver une ROM Lineage OS en version 17 pour le SMJ320FN. J'ai essayé [ce tutoriel](https://getdroidtips.com/lineage-os-17-1-galaxy-j3-2016/) mais l'installation de la ROM s'arrête avec une erreur `no Digest file found`. Si quelqu'un à une solution il peut le poster en commentaire 😉

---

Références :

- [Installer LineageOS sur un smartphone Samsung Galaxy](https://blog.microlinux.fr/lineageos-samsung-galaxy/)