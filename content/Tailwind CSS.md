---
title: Tailwind CSS
permalink: tailwind-css
description: Tailwind CSS est un framework CSS qui permet de designer des interfaces web rapidement sans utiliser de CSS.
datePublished: 2024-04-01T10:00:00
dateUpdated: 2024-12-06T10:00:00
publish: true
rss: true
---

Tailwind CSS est un framework CSS qui permet de designer des interfaces web rapidement sans utiliser de CSS.

Au lieu de définir des classes CSS dans un fichier séparé, on les définit directement dans le HTML.

Voici un exemple de code HTML avec Tailwind CSS :

```html
<h1 class="text-3xl font-bold underline">
    Hello world!
</h1>
```

Vous pouvez copier-coller cet exemple dans le [Playground](https://play.tailwindcss.com/) de Tailwind CSS pour voir le résultat.

## Installation

Pour l'essayer rapidement, vous pouvez ajouter le CDN `cdn.tailwindcss.com` dans un fichier `index.html` :

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Hello world</title>
        <meta name="description" content="Hello world">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>
    </body>
</html>
```

Si vous ouvrez ce fichier dans un navigateur, vous verrez le texte "Hello world!" avec un style CSS généré par Tailwind CSS.

L'utilisation de `cdn.tailwindcss.com` est une solution rapide pour tester Tailwind CSS, mais pour un projet plus sérieux, il est préférable de l'installer localement.

Pour cela, remplacez la balise `script` par une balise `link` pour charger le fichier CSS `output.css` compilé localement :

```diff
- <script src="https://cdn.tailwindcss.com"></script>
+ <link href="./output.css" rel="stylesheet">
```

Pour compiler le fichier CSS `output.css`, utilisez la commande suivante :

```bash
npx @tailwindcss/cli@next -o output.css
```

## Utilisation

Concernant son utilisation, Tailwind CSS propose des classes CSS pour les couleurs, les tailles de texte, les marges, les paddings, les bordures, les ombres, etc..

Cela dépend de vos besoins, mais voici quelques exemples de classes CSS que vous pouvez utiliser :

- `text-red-500` : texte rouge
- `bg-blue-500` : fond bleu
- `p-4` : padding de 1rem
- `m-8` : margin de 2rem
- `border` : bordure
- `shadow-lg` : ombre
- Et bien d'autres...

## Installation sur Next.js

Tailwind CSS est un projet open-source très populaire et peut être utilisé avec de [nombreux frameworks](https://tailwindcss.com/docs/installation/framework-guides) (Next.js, Nuxt, Gatsby, etc.).

Pour l'installer avec Next.js, exécutez les commandes suivantes :

```bash
yarn add -D tailwindcss @tailwindcss/postcss postcss
```

```bash
cat > postcss.config.mjs << EOF
export default {
    plugins: {
        '@tailwindcss/postcss': {},
    },
};
EOF
```

```bash
mkdir styles
echo "@import 'tailwindcss';" > styles/globals.css
```

Ajoutez la ligne suivante dans le fichier `pages/_app.js` :

```diff
+import '../styles/globals.css';
+
export default ({ Component, pageProps }) => <Component {...pageProps} />;
```

Pour aller plus loin, je vous invite à regarder la [documentation officielle](https://tailwindcss.com/docs/installation) 😉.