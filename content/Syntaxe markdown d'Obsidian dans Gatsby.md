---
datePublished: 2021-05-31T16:00
dateUpdated: 2021-05-31T16:00
permalink: ajouter-le-support-de-la-syntaxe-markdown-d'obsidian-dans-gatsby
publish: true
rss: true
---

Les fichiers markdown dans [[Obsidian]] peuvent avoir une syntaxe spéciale propre à Obsidian :

- `[[Internal link]]`
- `[[Internal link|With custom text]]`
- `[[Internal link#heading]]`
- `[[Internal link#heading|With custom text]]`
- `[[Embed note]]`
- `[[Embed note#heading]]`

Cette syntaxe permet de relier des notes entre elles via des liens bidirectionnels (`[[Internal link]]`).

Pour ajouter le support de ces liens, j'ai créé un plugin [gatsby-remark-obsidian](https://github.com/johackim/gatsby-remark-obsidian).

Vous pouvez intégrer ce plugin avec Remark ou MDX :

```javascript
// gatsby-config.js
plugins: [
    {
        resolve: "gatsby-transformer-remark",
        options: {
            plugins: [
                {
                    resolve: 'gatsby-remark-obsidian',
                },
            ]
        }
    },
],
```

Si vous utilisez MDX :

```javascript
// gatsby-config.js
plugins: [
    {
        resolve: 'gatsby-plugin-mdx',
        options: {
            extensions: ['.md'],
            gatsbyRemarkPlugins: [
                {
                    resolve: 'gatsby-remark-obsidian',
                },
            ],
        },
    },
],
```

PS : Si vous utilisez Next.js, j'ai créé [un autre plugin](https://github.com/johackim/remark-obsidian).