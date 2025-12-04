---
title: Prettier
permalink: installer-prettier
datePublished: 2021-06-27T19:19
dateUpdated: 2021-06-27T19:19
publish: true
rss: true
note: 66
---

[Prettier](https://prettier.io/) permet de formater votre code automatiquement selon vos besoins, par exemple :

- Indenter automatiquement son code avec 4 espaces.
- Utiliser des simples quotes à la place des doubles quotes.
- Limiter chaque ligne à un nombre de caractères.

## Installation

Pour installer Prettier, exécutez la commande suivante :

```bash
yarn add -D prettier
```

## Configuration

Ajouter un fichier .prettierrc à la racine de votre projet :

```bash
cat > .prettierrc << EOF
{
  "endOfLine": "lf",
  "singleQuote": true,
  "tabWidth": 4,
  "trailingComma": "es5",
  "printWidth": 300
}
EOF
```

Vous pouvez générer votre configuration à partir du [Playground de Prettier](https://prettier.io/playground/).

Vous pouvez créer une commande `lint` dans votre fichier `package.json` :

```json
// package.json

"scripts": {
    "lint": "prettier --write"
}
```

## Installation sur vim

Cloner le dépôt [vim-prettier](https://github.com/prettier/vim-prettier) dans votre dossier bundle :

```bash
git clone https://github.com/prettier/vim-prettier ~/.vim/bundle
```

Ajouter la configuration suivante dans votre fichier `.vimrc` :

```vim
" ~/.vimrc
nmap <Leader>b <Plug>(Prettier)
```

Vous pouvez à présent executer la commande :prettier avec le raccourcis `<CTRL>, + b`.

## Utilisation

Vous pouvez à présent utiliser Prettier pour vérifier ou formater automatiquement la syntaxe de votre code :

```bash
./node_modules/.bin/prettier --check .
```

```bash
./node_modules/.bin/prettier --write .
```