---
title: Générer dynamiquement des images avec node-canvas
permalink: generer-dynamiquement-des-images-avec-node-canvas
datePublished: 2021-07-05T16:31
dateUpdated: 2021-07-05T16:31
publish: true
rss: true
note: 57
---

Pour générer des images de manière dynamique en Node.js, il existe la librairie `node-canvas` :

```bash
yarn add -D canvas canvas-txt
```

```js
// script.js
const fs = require('fs');
const { createCanvas } = require('canvas');
const { default: canvasTxt } = require('canvas-txt');

const createImage = (text, path = 'image.jpg', width = 1600, height = 900) => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#101827';
    ctx.fillRect(0, 0, width, height);

    canvasTxt.fontSize = 72;
    canvasTxt.fontWeight = 500;
    canvasTxt.font = 'Roboto';
    canvasTxt.align = 'center';
    canvasTxt.vAlign = 'middle';
    ctx.fillStyle = '#E5E7EB';
    canvasTxt.drawText(ctx, text, 0, canvas.height / 4, canvas.width - 10, canvas.height / 2);

    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path, buffer);
};

createImage('Hello World!');
```

Lorsque j'exécute ce script (`node script.js`), une image avec un fond gris et un texte blanc "Hello World!" sera créée.

C'est cette librairie que j'utilise pour générer automatiquement toutes les previews de mon [Digital Garden](https://johackim.com).

---

Références :

- [[Programmation]]