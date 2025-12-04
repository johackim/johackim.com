---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: creer-un-flux-rss-avec-gatsby
publish: true
rss: true
note: 46
---

Pour créer un flux RSS avec Gatsby, installez le plugin `gatsby-plugin-feed` :

```bash
npm install gatsby-plugin-feed
```

Puis, ajoutez au fichier `gatsby-config.js` la configuration suivante :

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
    },
  ],
};
```

---

Références :

- [[RSS]]