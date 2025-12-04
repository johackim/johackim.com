---
datePublished: 2021-05-31T16:00
dateUpdated: 2021-05-31T16:00
permalink: importer-ses-notes-markdown-dans-gatsby
publish: true
rss: true
---

Après avoir [[Initialiser un projet Gatsby]], créez un dossier `content` qui va contenir toutes vos notes au format markdown (ex: `content/hello-world.md`).

**NOTE** : Vous pouvez ouvrir se dossier avec Obsidian ou n'importe quel éditeur de fichier markdown pour éditer vos notes.

Installez et configurez le package `gatsby-source-filesystem` & `gatsby-transformer-remark` pour pouvoir detecter les fichiers markdown de votre dossier `content` dans Gatsby  :

```bash
yarn add -D gatsby-source-filesystem gatsby-transformer-remark
```

```javascript
// gatsby-config.js

module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: './content',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
        },
    ],
};
```

Créez le fichier `gatsby-node.js` avec la configuration si dessous pour pouvoir créer des pages pour chacune de vos notes markdown :

```js
// gatsby-node.js

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        id
                        html
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild('Error while running GraphQL query.');
        return;
    }

    const markdowns = result.data.allMarkdownRemark.edges;

    const noteTemplate = require.resolve('./src/templates/noteTemplate.js');

    markdowns.forEach(({ node }) => {
        const { id, html } = node;

        createPage({
            path: `/${node.parent.name}`,
            component: noteTemplate,
            context: { id, html },
        });
    });
};
```

```js
// src/templates/noteTemplate.js

import React from 'react';

export default function Template({ pageContext }) {
    const { html } = pageContext;

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

Si vous avez une note `hello-world.md` dans votre dossier `content` et que vous vous rendez à l'adresse [http://localhost:8000/hello-world](http://localhost:8000/hello-world), cela devrait afficher le contenu de votre fichier markdown.