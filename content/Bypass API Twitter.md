---
title: Contourner l'API payante de Twitter
permalink: bypass-api-twitter
description: Comment récupérer le nombre de followers d'un compte X (Twitter) sans utiliser l'API payante de Twitter ?
datePublished: 2023-12-20T20:05:00
dateUpdated: 2025-11-18T14:38:00
publish: true
rss: true
---

Depuis que X (Twitter) a rendu son API payante, il est devenu difficile de récupérer le nombre de followers d'un compte. Voici une solution pour récupérer le nombre de followers d'un compte Twitter sans utiliser l'API de Twitter.

> [!IMPORTANT]
> Depuis que le [projet Nitter](https://github.com/zedeus/nitter) est arrêté, la solution présentée dans cet article ne fonctionne plus. Depuis, j'utilise l'[API gratuite de Rapid API](https://rapidapi.com/twttrapi-twttrapi-default/api/twttrapi) ou [celle-ci](https://rapidapi.com/alexanderxbx/api/twitter-api45)

Au lieu de passer par Twitter directement, je passe par [Nitter](https://nitter.net/), un [front-end](https://github.com/mendel5/alternative-front-ends) open-source pour Twitter.

J'utilise cette technique sur [mon blog](https://github.com/johackim/johackim.com/commit/a771519fbe142c9aee768841821ccac3d34f798a) pour afficher le nombre de followers de mon compte Twitter.

## Avec une requête cURL

Si vous exécutez la commande suivante, vous obtiendrez le nombre de followers de [mon compte Twitter](https://twitter.com/_johackim) :

```bash
curl -sL --insecure https://nitter.net/_johackim \
  -H 'accept-encoding: deflate, gzip' \
  -H 'accept-language: en' \
  -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36' \
  --compressed | grep -oPz 'Followers[^%]*<span class="profile-stat-num">\d+'
```

Il suffit de modifier le nom d'utilisateur dans l'URL pour obtenir le nombre de followers d'un autre compte.

## Avec Node.js

Voici un exemple de code pour récupérer le nombre de followers d'un compte Twitter avec Node.js :

```bash
yarn add -D node-fetch
```

```js
// index.mjs

import https from 'https';
import fetch from 'node-fetch';

const getTwitterFollowers = async (username) => {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const data = await fetch(`https://nitter.net/${username}`, {
        agent: httpsAgent,
        headers: {
            Accept: '*/*',
            'Accept-Language': 'en',
            'Accept-Encoding': 'deflate, gzip',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        },
    })
        .then((res) => res.text())
        .then((text) => {
            const followersMatch = text.match(/Followers<\/span>\s*<span class="profile-stat-num">(\d+)/i);
            return followersMatch?.[1]?.trim() || 0;
        });

    return data;
};

const followers = await getTwitterFollowers('_johackim');
console.log({ followers });
```

```bash
node index.mjs
```

Voilà, vous savez maintenant comment récupérer le nombre de followers d'un compte Twitter sans utiliser l'API payante de Twitter 😀 !

PS : Si jamais une instance ne fonctionne pas (ex: nitter.net), vous pouvez [utiliser une autre instance](https://status.d420.de/).

---

Références :

- [[Programmation]]