---
title: Expo
permalink: expo
description: Expo est un framework qui permet de créer des applications mobiles (Android, iOS) et web avec React Native.
datePublished: 2024-03-04T10:00:00
dateUpdated: 2024-03-04T22:00:00
publish: true
rss: true
note: 76
---

[Expo](https://expo.dev/) est un framework qui permet de créer des applications mobiles (Android, iOS) et web avec [React Native](https://reactnative.dev/).

Vous avez une codebase unique pour toutes les plateformes et vous n'avez pas besoin d'utiliser des outils comme Android Studio ou Xcode.

Vous pouvez utiliser votre éditeur de texte préféré (Neovim, VS Code, Sublime Text, etc.) et votre navigateur web pour développer votre application.

## Installation

Pour l'installer, vous avez besoin de [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/).

Exécutez la commande suivante pour créer un nouveau projet :

```bash
npx create-expo-app my-app
```

## Utilisation

Pour démarrer le projet, exécutez la commande suivante :

```bash
npm run start
```

Appuyez sur la touche `w` pour ouvrir la version web.

Personnellement, je supprime tous les fichiers du code par défaut sauf `App.js` et `app.json`.

Le code ressemble à cela :

```js
// App.js

import { Text, View } from 'react-native';

export default () => (
    <View>
        <Text>Hello world!</Text>
    </View>
);
```

Pour créer une application cross-platform, je pense qu'il n'y a rien de mieux qu'Expo. Surtout pour les développeurs qui connaissent déjà bien JavaScript et React 🙂.

PS : Je n'ai pas encore essayé, mais en théorie, il serait possible de lier Expo à [[Electron]] pour créer une application desktop (Windows, macOS, Linux) avec la même codebase.

---

Références :

- [Fireship - Expo in 100 Seconds](https://youtu.be/vFW_TxKLyrE)
- https://expo.dev/