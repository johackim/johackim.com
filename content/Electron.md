---
title: Electron
permalink: electron
description: Electron est un framework qui permet de créer des applications de bureau multi-plateformes.
datePublished: 2024-03-18T10:00:00
dateUpdated: 2024-03-18T10:00:00
publish: true
rss: true
note: 71
---

[Electron](https://electronjs.org/) est un framework qui permet de créer des applications de bureau multi-plateformes.

Il est basé sur Node.js et le moteur de rendu Chromium.

C'est un projet open-source créé par GitHub et est maintenu par une communauté très active.

## Installation

Pour installer Electron, il suffit de lancer la commande suivante dans un nouveau dossier :

```bash
yarn add -D electron
```

PS : N'oubliez pas de créer un fichier package.json avec la commande `npm init -f`.

## Utilisation

Pour créer un projet Electron, il suffit de créer un fichier `index.js` et d'y ajouter le code suivant :

```js
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow();

    win.loadURL(`data:text/html;charset=UTF-8,
    <html>
        <body>
          <h1>Hello World!</h1>
        </body>
    </html>`);
};

app.whenReady().then(createWindow);
```

Il s'agit d'un exemple très simple qui affiche une fenêtre avec le texte "Hello World!".

Pour lancer l'application Electron, il suffit d'exécuter la commande suivante :

```bash
npx electron index.js
```

Et pour compiler votre application :

```bash
npx electron-builder build
```

Pour aller plus loin, je vous invite à consulter la [documentation officielle](https://electronjs.org/docs).

Electron est un framework très populaire et est utilisé par de nombreuses applications comme Signal, Obsidian, Visual Studio Code, Discord et [plein d'autres](https://electronjs.org/apps).

---

Références :

- https://github.com/electron/electron