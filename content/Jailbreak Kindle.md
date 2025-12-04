---
title: Comment jailbreaker son Kindle avec la faille Adbreak ?
permalink: jailbreak-kindle
datePublished: 2025-09-30T10:00:00
dateUpdated: 2025-11-23T10:00:00
publish: true
rss: true
note: 89
---

Un nouveau jailbreak du Kindle nommé AdBreak vient d'être publié le 24 septembre 2025 sur [kindlemodding.org](https://kindlemodding.org/jailbreaking/AdBreak/).

Pour réaliser ce jailbreak, il faut que la version du firmware de votre Kindle soit `>= 5.18.1` et `<= 5.18.5`.

> [!NOTE]
> Évitez de mettre à jour votre Kindle en version 5.18.6, la faille Adbreak a été patché.

> [!NOTE]
> Si la version de votre firmware est inférieure à 5.18.1, utilisez le jailbreak [WinterBreak](https://kindlemodding.org/jailbreaking/WinterBreak/).

Voici les étapes pour jailbreaker votre Kindle.

## 1. Mettre votre Kindle en mode avion pour éviter les mises à jour

Pour activer le mode avion, allez dans Paramètres -> Wi-fi -> Mode avion.

## 2. Supprimer les fichiers update_kindle.bin sur votre Kindle

Pour éviter que votre Kindle se mette à jour, vérifiez s’il existe des fichiers du type `update_kindle.bin`.

Connectez votre Kindle à votre ordinateur via un câble USB.

Et supprimer tous les fichiers du type `update_kindle.bin` (ex: `update_kindle_10th_5.18.1.bin`) qui existent à la racine de votre Kindle.

## 3. Remplissez votre Kindle pour laisser seulement 50 Mo de disponible

Pour éviter que Amazon mette à jour votre liseuse, laissez 50 Mo de disponible.

Si vous êtes sur Windows, copiez et exécutez le script [Filler.ps1](https://github.com/bastianmarin/Kindle-Filler-Disk/blob/main/Filler.ps1) à la racine de votre Kindle :

```powershell
powershell -ExecutionPolicy Bypass -File .\Filler.ps1
```

Si vous êtes sur Linux, exécutez le script [Filler.sh](https://github.com/bastianmarin/Kindle-Filler-Disk/blob/main/Filler.sh) à la racine de votre Kindle :

```bash
bash Filler.sh
```

Pour vérifier l'espace disponible de votre Kindle, allez dans Paramètres > Options de l'appareil > Informations sur l'appareil > Espace disponible.

## 4. Enregistrez votre Kindle sur un compte Amazon

Votre Kindle a besoin d'être enregistré/relié à un compte Amazon pour pouvoir effectuer l'étape d'après.

Pour enregistrer votre Kindle, allez dans Paramètres > Votre compte > Enregistrer l'appareil.

Une fois enregistré, votre Kindle devrait apparaitre [sur votre compte Amazon](https://amazon.fr/hz/mycd/digital-console/alldevices).

## 5. Activez les publicités de votre Kindle

Le jailbreak exploite une faille en provenance du système de publicité.

Du coup, il faut activer les offres spéciales depuis [votre compte Amazon](https://amazon.fr/hz/mycd/digital-console/alldevices).

Réactivez le WIFI de votre Kindle en désactivant le mode avion.

Laissez votre Kindle pendant un certain temps, connecté à Internet, afin qu'il puisse télécharger des publicités.

Personnellement, je me balade dans la boutique Amazon sur la page d'accueil pour stimuler le Kindle.

Des publicités devraient apparaitre sur l'écran de veille de votre Kindle lorsque vous appuyez sur le bouton de veille.

Réactivez le mode avion de votre Kindle.

Cliquez sur le menu en haut à droite et sélectionnez "Afficher toutes les publicités".

## 6. Jailbreak du Kindle

Branchez votre Kindle et copiez le dossier `system/.assets` sur votre ordinateur.

[Téléchargez le fichier adbreak.zip](https://mobileread.com/forums/attachment.php?attachmentid=218255&d=1758739462) puis l'extraire dans le dossier `.assets` qui se trouve sur votre ordinateur.

Si vous êtes sur Windows, double-cliquez sur le fichier `replace.bat`.

Si vous êtes sur Linux, exécutez la commande suivante :

```bash
find . -name 'details.html' -exec cp adbreak.html {} \;
```

Supprimez le dossier `.assets` de votre Kindle et remplacez-le par le nouveau.

Débranchez votre Kindle, cliquez sur une annonce et une fois que vous avez cliqué sur "Bang!", le script jailbreak devrait s'exécuter.

> [!NOTE]
> You can safely ignore any "application error" popups, they are irrelevant.

Cela devrait afficher le message suivant :

```txt
**** AdBreak Jailbreak ****
********************** 1.0.0 *
install_touch_update_key - Copying the jailbreak updater key
Developer keys installed successfully (Standard Method)! (pubdevkey01.pem)
Enabled developer flag
Enabled mntus exec flag
                                      
**************************************
*** Finished installing jailbreak! ***
***                                ***
***   Please Install HOTFIX now    ***
**************************************
```

## 7. Persister le jailbreak avec le HotFix

Pour éviter que le Jailbreak disparaisse, installez le hotfix.

[Téléchargez le HotFix](https://github.com/KindleModding/Hotfix/releases/latest/download/Update_hotfix_universal.bin).

Copiez le fichier `Update_hotfix_universal.bin` à la racine de votre Kindle.

Gardez le mode avion activé.

Débrancher votre Kindle, puis ouvrir les paramètres, cliquer sur les trois points et sélectionner "Mettre à jour votre Kindle".

Une fois le Kindle redémarré, sélectionnez le livre `Run Hotfix` dans votre bibliothèque.

> [!NOTE]
> Vous devrez exécuter ce livre `Run Hotfix` après chaque mise à jour de votre Kindle.

## 8. Désactiver les mises à jour over-the-air (facultatif)

Voici la procédure pour éviter que des mises à jour soit automatiquement installés via le WIFI.

Télécharger l'extension [renameotabin.zip](https://www.mobileread.com/forums/attachment.php?attachmentid=184438&d=1609580931).

Extraire le fichier puis copier le dossier `renameotabin` dans le dossier `extensions` de votre Kindle.

Débranchez votre Kindle puis cliquez sur `Rename OTA Binaries` puis `Rename` depuis le menu du livre `KUAL`.

Votre Kindle redémarrera automatiquement.

Les mises à jour automatiques sont maintenant désactivées et je peux utiliser le wifi de mon Kindle.

> [!NOTE]
> Pour réinitialiser, rétrograder ou mettre à jour votre Kindle, ouvrez `KUAL` et sélectionnez `Rename OTA Binaries` puis `Restore`.

## 9. Installation de KOReader (facultatif)

Pour installer KOReader, il faut d'abord installer KUAL (Kindle Unified Application Launcher) et MRPI (MobileRead Package Installer).

Pour installer MRPI, téléchargez les fichiers [kual-mrinstaller-khf.tar.xz](https://drive.proton.me/urls/GR7EETY0C8#4OT7bCXXmfWE) et [KUAL-c6ac782-20250419.tar.xz](https://drive.proton.me/urls/03F36YX6TM#aN1lgoaFDy0J).

- Extraire les fichiers `kual-mrinstaller-khf.tar.xz` et `KUAL-c6ac782-20250419.tar.xz`
- Copiez les dossiers `extensions` and `mrpackages` à la racine de votre Kindle.
- Copiez le fichier `Update_KUALBooklet_c6ac782_install.bin` dans le dossier `mrpackages`.

> [!NOTE]
> Faites de la place en supprimant un des fichiers du dossier `fill_disk` si besoin.

Débranchez votre Kindle et tapez `;log mrpi` dans la barre de recherche de votre Kindle et appuyez sur entrée.

Un livre `KUAL` devrait apparaitre dans votre bibliothèque.

Télécharger [koreader-kindlehf-v2025.08.zip](https://github.com/koreader/koreader/releases/download/v2025.08/koreader-kindlehf-v2025.08.zip).

Copiez les dossiers `extensions` et `koreader` à la racine de votre Kindle.

Débranchez votre Kindle et cliquez sur le livre `KUAL` puis cliquez sur KOReader

---

Références :

- [[Kindle]]
- https://kindlemodding.org/jailbreaking/AdBreak/
- https://mobileread.com/forums/showthread.php?t=370048
- https://mobileread.com/forums/showthread.php?t=225030
- https://discord.com/channels/1083603487025274911/1166993303221321758/1421875686561546271