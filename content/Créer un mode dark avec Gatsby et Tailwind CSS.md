---
datePublished: 2021-11-15T09:33
dateUpdated: 2021-11-15T09:33
permalink: creer-un-mode-dark-avec-gatsby-et-tailwind-css
publish: true
rss: true
note: 77
---

Pour créer un thème dark avec [Gatsby](https://gatsbyjs.com/) et [TailwindCSS](https://tailwindcss.com/), une fois que vous avez [[Initialiser un projet Gatsby|initialisé Gatsby]] et [[Intégrer Tailwind CSS à gatsby|paramétré Tailwind CSS]], il vous faut simplement installer le package `react-helmet` et créer 3-4 fichiers.

## 1. Installer react-helmet

Installer le package react-helmet pour pouvoir overrider la classe de votre balise `html`.

```bash
yarn add -D react-helmet gatsby-plugin-react-helmet
```

```js
// gatsby-config.js

module.exports = {
    plugins: [
        // ...
        'gatsby-plugin-react-helmet',
    ],
};
```

## 2. Activer le darkMode dans Tailwind CSS

Dans le fichier `tailwind.config.js`, activez le darkMode en lui attribuant la valeur `class`, cela permettra de prendre en compte les classes html `dark:` :

```bash
// tailwind.config.js

module.exports = {
    darkMode: 'class',
};
```

## 3. Créer un Switch button

Créez un composant `switch.js`, il contient le button qui peut alterner votre dark mode :

```js
// src/components/switch.js

import React, { useState, useEffect } from 'react';

const isBrowser = () => typeof window !== 'undefined';

const getItem = (name) => isBrowser() && localStorage.getItem(name);

const setItem = (name, item) => isBrowser() && localStorage.setItem(name, item);

export default ({ onChange }) => {
    const [darkMode, setDarkMode] = useState(getItem('darkMode') === 'true' || (isBrowser() && window.matchMedia('(prefers-color-scheme: dark)').matches));

    useEffect(() => {
        setItem('darkMode', darkMode);
        onChange(darkMode);
    }, [darkMode]);

    return (
        <button type="button" className="border px-2" onClick={() => setDarkMode(!darkMode)}>Switch</button>
    );
};
```

Intégrez votre composant `Switch` dans votre page Gatsby `index.js` :

```javascript
// src/pages/index.js

import React, { useState } from 'react';
import Helmet from 'react-helmet';

import Switch from '../components/switch';

const IndexPage = () => {
    const [darkMode, setDarkMode] = useState(typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true');

    return (
        <>
            <Helmet
                htmlAttributes={{ class: darkMode ? 'dark' : 'light' }}
                bodyAttributes={{ class: 'dark:bg-gray-900 dark:text-gray-300' }}
            />
            <Switch onChange={(isDark) => setDarkMode(isDark)} />
        </>
    );
};

export default IndexPage;
```

## 4. Créer un fichier gatsby-ssr.js (facultatif)

Cette étape est facultatif, mais elle permet d'améliorer la vitesse de rendu du thème dark.

```js
// gatsby-ssr.js

import React from 'react';

export { wrapRootElement } from './gatsby-browser';

export const onRenderBody = ({ setPreBodyComponents }) => {
    const setColorsByTheme = () => {
        const darkMode = localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.className = darkMode ? 'dark' : 'light';
    };

    const calledFunction = `(${setColorsByTheme})()`;
    setPreBodyComponents(<script key="darkMode" dangerouslySetInnerHTML={{ __html: calledFunction }} />);
};
```

---

Références :

- https://joshwcomeau.com/react/dark-mode/
- https://github.com/insin/gatsby-plugin-dark-mode/