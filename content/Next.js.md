---
title: Next.js
permalink: nextjs
description: Next.js est un framework JavaScript basé sur React pour créer des applications Web.
datePublished: 2021-12-19T17:57:00
dateUpdated: 2021-12-19T17:57:00
publish: true
rss: true
note: 70
---

[Next.js](https://nextjs.org/) est un framework JavaScript basé sur React pour créer des applications Web.

## Installation

Pour créer une application Next.js, exécutez la commande suivante :

```bash
yarn add -D next react react-dom
```

Créez les 2 fichiers suivants :

```js
// pages/index.js

export default () => <p>Hello world</p>;
```

```js
// pages/_app.js

export default ({ Component, pageProps }) => <Component {...pageProps} />;
```

Puis ajoutez les commandes suivantes pour utiliser Next.js plus facilement :

```bash
npm pkg set scripts.dev="next dev"
npm pkg set scripts.build="next build"
npm pkg set scripts.start="next start"
npm pkg set scripts.lint="next lint"
```

PS : Exécutez la commande `npm init -f` si votre fichier `package.json` n'existe pas.

## Utilisation

Une fois installé, vous pouvez démarrer [Next.js](https://nextjs.org/) avec la commande suivante :

```bash
npm run dev
```

## Fonctions spéciales Next.js

Il existe certaines fonctions propre à next.js :

- `getStaticProps` : fonction utilisé pour récupérer du contenu static durant la phase de build
- `getServerSideProps` : fonction utilisé pour récupérer du contenu depuis un serveur
- `getInitialProps` : fonction utilisé pour récupérer du contenu depuis un serveur ou un client

---

Références :

- [Grafikart - Tutoriel vidéo React: Next.js](https://grafikart.fr/tutoriels/nextjs-react-1892)
- [Static Blog With Next.js and Markdown](https://youtube.com/watch?v=MrjeefD8sac)
- [Documentation Next.js](https://nextjs.org/docs/)
- https://jsmastery.pro/ultimate-next-course
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata