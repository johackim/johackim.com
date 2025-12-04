---
title: Puppeteer
permalink: puppeteer
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
publish: true
rss: true
note: 77
---

Si vous souhaitez parser un site internet, il existe [puppeteer](https://github.com/puppeteer/puppeteer).

## Installation

Pour installer puppeteer :

```bash
yarn add -D puppeteer
```

## Prendre un screenshot

Voici un exemple de script Node.js pour prendre un screenshot d'un site internet :

```js
#!/bin/node

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://johackim.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
```

## Parser l'URL d'une vidéo

Si la page que vous souhaitez parser dispose d'un lien video, vous pouvez reprendre son URL :

```js
const url = await page.$eval('video', (a) => a.getAttribute('src'));
```

Et si vous intégrer `youtube-dl`, vous pouvez enregistrer la vidéo en question :

```js
await execSync(`youtube-dl -o "${filePath}" -f 'best[ext=mp4]' ${url}`, { stdio: 'inherit' });
```

## Vous connecter sur un site automatiquement

Vous pouvez vous connecter automatiquement sur un site en remplissant automatiquement les champs `email` et `password`, puis sauvegarder le cookie dans un fichier `cookie.json` :

```js
await page.focus('input#email');
await page.keyboard.type(email);

await page.focus('input#password');
await page.keyboard.type(password);

await page.click('.container form button[type=submit]');

await page.waitForSelector('.logged-in');

const cookies = await page.cookies();
await page.setCookie(...cookies);

fs.writeFileSync('cookie.json', JSON.stringify(cookies, null, 2));
```

Facultatif : vous pouvez exporter le cookie directement depuis votre navigateur via [cette extension](https://chrome.google.com/webstore/detail/json-for-puppet/nmckokihipjgplolmcmjakknndddifde).

Pour réutiliser vos cookies dans une autre session Puppeteer :

```js
const cookieFile = await fs.readFile('cookies.json');
const cookies = JSON.parse(cookieFile);
await page.setCookie(...cookies);
```

## Modifier les paramètre du navigateur headless

Puppetteer vous permet de modifier les paramètres du navigateur headless. Si vous souhaitez modifier le navigateur ou le header HTTP User-Agent, écrivez les lignes suivantes :

```js
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome-stable' });
const page = await browser.newPage();
await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4512.0 Safari/537.36');
```

## Récupérer le contenu complet d'une page HTML

```js
const html = await page.content();
// Ou
const html = await page.evaluate(() => document.body.innerHTML);
```

## Debugger

Pour débugger, désactivez le mode `headless` :

```bash
await puppeteer.launch({ headless: false });
```

Cela vous permettra de visualiser le rendu directement depuis un vrai navigateur.