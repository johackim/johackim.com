---
datePublished: 2021-12-26T15:44
dateUpdated: 2021-12-26T15:44
permalink: creer-un-systeme-dauthentification-oauth-avec-spotify
publish: true
rss: true
note: 70
---

Voici comment créer un système d'authentification [[OAuth]] avec Spotify.

Commencez par [créer un compte développeur sur Spotify](https://developer.spotify.com/dashboard/).

Une fois le compte créé, vous avez accès à un **client ID** et **client Secret**.

Ensuite, ajoutez votre site (ex: http://localhost:3000/) et l'**URL de callback** (ex: http://localhost:3000/callback) dans les settings.

Ajoutez dans votre code (JavaScript, PHP, Python) un lien (ex: `/login`) qui redirige vers l'adresse suivante :

```js
const CLIENT_ID = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const REDIRECT_URI = 'http://localhost:3000/callback';

const scope 'user-read-email'; // Plus d'infos sur https://spoti.fi/3sp8zZY
const state 'f5d587a11cf33f26812ff17bbedb1928' // une chaine aléatoire de 16 caractères

res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${scope}&redirect_uri=${REDIRECT_URI}&state=${state}`);
```

Une fois que la personne à cliquer sur le lien spotify, cela lui demandera si il accepte de nous fournir ces informations, dans notre cas il s'agit de l'email (user-read-email).

Cela redirigera ensuite la personne sur l'adresse de callback avec le paramètre `code`.

Ce paramètre `code` nous sert à récupérer le **token d'accès** pour communiquer avec l'[API de spotify](https://developer.spotify.com/documentation/web-api/reference).

```js
const { code } = req.query;
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

const { access_token: accessToken } = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-form-urlencoded',
    },
    body: new URLSearchParams({
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
    }),
}).then((r) => r.json());
```

On peut à présent [récupérer l'email de l'utilisateur](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile) :

```js
const { email } = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
}).then((r) => r.json());
```

PS : Si vous recevez une erreur du type 'User not registered in the Developer Dashboard', c'est que votre application Spotify est encore en [Development mode](https://developer.spotify.com/dashboard/). Vous devez soit faire "REQUEST EXTENSION" pour sortir du mode développement, soit ajouter les utilisateurs manuellement.

---

Références :

- [API de Spotify](https://developer.spotify.com/documentation/web-api/reference)
- [API de Spotify 2](https://developer.spotify.com/console/)
- [Documentation OAuth de spotify](https://developer.spotify.com/documentation/general/guides/authorization/)
- [Grafikart - Comprendre l'OAUTH 2.0](https://grafikart.fr/tutoriels/oauth2-php-google-1171)