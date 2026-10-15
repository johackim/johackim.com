---
datePublished: 2022-03-11T12:00
dateUpdated: 2022-03-11T12:00
title: Mochi, une application pour mieux retenir vos apprentissages.
permalink: mochi
publish: true
rss: true
---

[Mochi](https://mochi.cards/) est un outil créé par [Matthew Steedman](https://github.com/knubie/) pour créer des flashcards afin d'améliorer à mémoriser ses apprentissages via la méthode de la [[Répétition espacée]].

## Installation

Vous pouvez l'installer sur [Windows](https://mochi.cards/releases/Mochi%20Setup%201.13.7.exe), [Linux](https://mochi.cards/releases/Mochi-1.13.7.AppImage), [macOS](https://mochi.cards/releases/releases/Mochi-1.13.7.dmg), [Android](https://play.google.com/store/apps/details?id=cards.mochi.app) et [iOS](https://apps.apple.com/us/app/mochi-flashcards-and-notes/id1507775056).

## Utilisation

Les cartes peuvent être rédigé en markdown.

Pour créer des cartes avec **un texte à trou** :

```markdown
Créer une carte avec un {{text à trou}}.
```

Pour créer des cartes **question/réponse** :

```markdown
Créer une carte avec une question

---

Et une réponse
```

Vous pouvez aussi créer des templates pour créer vos cartes plus rapidement :

```markdown
## << Mot en français >>

---

<< English word >>

> << Example sentence >>
```

## Bug d'écran noir

Si comme moi, vous êtes sur Android 7 et/ou Lineage OS et que vous avez [un bug d'écran noir](https://i.imgur.com/9N5X4PT.jpg) au démarrage de l'application, il faut mettre à jour Android System WebView :

- **Installez [Android System WebView](https://play.google.com/store/apps/details?id=com.google.android.webview)** depuis votre Store préféré (ex: [Aurora](https://f-droid.org/fr/packages/com.aurora.store/)).

- **Désactivez l'ancienne version de Android System Webview** depuis le menu Settings -> Apps -> Show system -> Android System Webview -> Disable.

Vous pouvez à présent profiter de votre application 😀 !