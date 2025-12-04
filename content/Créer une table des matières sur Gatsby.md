---
datePublished: 2021-05-31T16:00
dateUpdated: 2021-05-31T16:00
permalink: creer-une-table-des-matieres-des-fichiers-markdown-avec-gatsby
title: Créer une table des matières des fichiers markdown avec Gatsby
publish: true
rss: true
note: 62
---

Après avoir [[Initialiser un projet Gatsby]] et [[Importer ses notes markdown dans Gatsby|importer vos fichiers markdown]], vous pouvez créer automatiquement la table des matière d'un fichier markdown dans Gatsby.

```javascript
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
                        headings {
                            value
                            depth
                        }
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
        const { id, html, headings } = node;

        createPage({
            path: `/${node.parent.name}`,
            component: noteTemplate,
            context: { id, html, headings },
        });
    });
};
```

```javascript
// src/components/toc.js
import React from 'react';
import { Link } from 'gatsby';
import slugify from 'slugify';

export default ({ headings = [], depthMin = 1, className = '' }) => {
    if (!headings.length) return false;

    return (
        <ul className={className}>
            {headings.filter(({ depth }) => depth >= depthMin).map(({ value }) => {
                const id = slugify(value, { lower: true, strict: true });

                return (
                    <li key={value}>
                        <Link to={`#${id}`} title={value}>
                            {value}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};
```

```js
// src/templates/noteTemplate.js
import React from 'react';
import Toc from '../components/toc';

export default function Template({ pageContext }) {
    const { html, headings } = pageContext;

    return (
        <>
            <Toc headings={headings} depthMin={2} />
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </>
    );
}
```

Pour créer automatiquement les id sur chaque header, il existe le plugin [gatsby-remark-autolink-headers](https://gatsbyjs.com/plugins/gatsby-remark-autolink-headers/) :

```npm
yarn add -D gatsby-remark-autolink-headers
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
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-autolink-headers',
                        options: {
                            icon: false,
                        },
                    },
                ],
            },
        },
    ],
};
```