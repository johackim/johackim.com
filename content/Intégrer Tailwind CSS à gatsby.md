---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: integrer-tailwind-css-a-gatsby
publish: true
rss: true
note: 66
---

Pour intégrer [Tailwind CSS](https://tailwindcss.com/) dans [Gatsby](https://gatsbyjs.com/), installez les packages npm suivants :

```bash
npm install -D tailwindcss postcss autoprefixer gatsby-plugin-postcss
```

## 1. Configurer Tailwind & Postcss

Créez les fichiers de configuration `tailwind.config.js`, `postcss.config.js` et `gatsby-config.js` :

```javascript
// tailwind.config.js

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
```

```javascript
// postcss.config.js

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
```

```javascript
// gatsby-config.js

module.exports = {
    plugins: ['gatsby-plugin-postcss'],
}
```

## 2. Créer un fichier style.css

Puis créez un fichier `style.css` à intégrer dans le fichier `gatsby-browser.js` :

```css
/* src/style.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
// gatsby-browser.js

import './src/style.css';
```

## 3. Utiliser Tailwind CSS dans votre code

Vous pouvez à présent utiliser Tailwind CSS partout dans votre code 😀 :

```js
// src/pages/index.js

import React from 'react';

const IndexPage = () => (
    <p className="text-red-800">Hello world!</p>
);

export default IndexPage;
```

---

Références :

- https://tailwindcss.com/docs/guides/gatsby