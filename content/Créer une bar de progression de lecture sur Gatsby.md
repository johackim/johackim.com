---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: creer-une-bar-de-progression-de-lecture-sur-gatsby
publish: true
rss: true
note: 45
---

Il existe [un plugin Gatsby](https://gatsbyjs.com/plugins/gatsby-plugin-page-progress/) qui permet d'automatiquement ajouter une bar de progression de lecture :

```bash
yarn add -D gatsby-plugin-page-progress
```

```javascript
// gatsby-config.js
{
    resolve: 'gatsby-plugin-page-progress',
    options: {
        height: 3,
        prependToBody: false,
        color: '#4A5563',
        footerHeight: 500,
        headerHeight: 0,
    },
},
```