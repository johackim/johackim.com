---
title: Storybook
permalink: storybook
datePublished: 2021-12-19T17:57
dateUpdated: 2024-03-04T17:57:00
publish: true
rss: true
note: 84
---

Storybook permet de créer des composants d'interface utilisateur indépendamment de la logique métier, des données et du contexte d'une application.

Je l'utilise pour isoler chacun de mes composants et les visualiser indépendamment des autres.

Ça m'incite à développer et debugger chaque composant une seule fois plutôt que de devoir le refaire plusieurs fois à 10 endroits différents.

## Installation

Si vous n'avez pas encore de projet, créez-en un avec la commande suivante :

```bash
npm init --force
```

Pour installer Storybook, exécutez la commande suivante :

```bash
npx sb init
```

## Utilisation

Pour lancer Storybook, exécutez la commande suivante :

```bash
npm run storybook
```

Rendez-vous sur http://localhost:6006

## Exemple de storybook

Voici un exemple de storybook pour un composant `header` :

```js
// components/header.stories.jsx

import Header from './header';

export default {
    title: 'Components/Header',
    component: Header,
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
```

## Installer le plugin storybook-tailwind-dark-mode

```bash
yarn add -D storybook-tailwind-dark-mode
```

N'oubliez pas d'activer le darkMode en attribuant la valeur `class` au fichier `tailwind.config.js`, cela permettra de prendre en compte les classes html `dark:` :

```bash
// tailwind.config.js

module.exports = {
    darkMode: 'class',
};
```

## Ajouter le support des CSS modules

Pour ajouter le support des [CSS Modules](https://github.com/css-modules/css-modules), ajouter les lignes suivantes :

```diff
module.exports = {
    stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        'storybook-tailwind-dark-mode',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: '@storybook/addon-postcss',
            options: {
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
+               cssLoaderOptions: {
+                   modules: {
+                       auto: true,
+                   },
+               },
            },
        },
    ],
    framework: '@storybook/react',
};
```

## Ajouter le support des images sur Next.js

Pour ajouter le support des [images sur Next.js](https://nextjs.org/docs/api-reference/next/image), ajoutez les lignes suivantes :

```diff
import '../styles/globals.css';

+ import * as nextImage from 'next/image';

+ Object.defineProperty(nextImage, 'default', {
+   configurable: true,
+   value: (props) => <img {...props} />,
+ });

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
```

## Ajouter des décorateurs

Pour toutes le stories d'un composant :

```js
export default {
    title: 'Components/Layout',
    component: Layout,
    decorators: [(Story) => <div id="storybook">{Story()}</div>],
};
```

Pour chaque stories d'un composant :

```js
export const Default = Template.bind({});

Default.args = {
    ...Layout.defaultProps,
    children: <section className="pt-20 px-4 container mx-auto lg:max-w-screen-lg">Hello world</section>,
};

Default.decorators = [(Story) => <div id="storybook">{Story()}</div>];
```

---

Références :

- https://storybook.js.org/
- [Exemple de storybook](https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-accordion--default)
- [Grafikart - Tutoriel JavaScript : Storybook](https://youtube.com/watch?v=CLwX9EWlWJM)
- [[Design system]]