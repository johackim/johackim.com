---
title: Initialiser eslint sur un projet JavaScript
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: initialiser-eslint-sur-un-projet-javascript
publish: true
rss: true
note: 55
---

Pour initialiser eslint sur un projet JavaScript il existe la commande suivante :

```bash
npm init @eslint/config@v0.4.6
npm pkg set scripts.lint="eslint ."
```

Personnellement j'ajoute les règles suivantes au fichier `.eslintrc.json` :

```js
// .eslintrc.json
"rules": {
    "indent": [2, 4, { "SwitchCase": 1 }],
    "max-len": [0],
    "object-curly-newline": [0],
    "import/no-extraneous-dependencies": [0],
    "import/prefer-default-export": [0],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": [0],
    "react/jsx-indent-props": [2, 4],
    "react/jsx-indent": [2, 4],
    "react/prop-types": [0],
    "react/no-unescaped-entities": [0],
    "react/function-component-definition": [0],
    "react/react-in-jsx-scope": [0],
    "no-restricted-syntax": [0],
    "complexity": [2, 6],
    "max-depth": [2, 2]
}
```

Si jamais vous rencontrez une erreur `File ignored by default` pour un fichier qui se situe dans un dossier caché (ex: `.storybook`), ajoutez la ligne suivante à votre fichier `.eslintrc.json` :

```bash
"ignorePatterns": ["!.storybook"],
```

Si vous souhaitez ignorer une ligne de code, ajoutez le commentaire `// eslint-disable-line`.

Et pour plusieurs lignes de code :

```js
/* eslint-disable */
console.log('Mon code javascript');
/* eslint-enable */

// Ou une règle particulière

/* eslint-disable max-lines-per-function */
console.log('Mon code javascript');
/* eslint-enable */

// Ou

/* eslint-disable-next-line complexity */
console.log('Mon code javascript');
```

Si vous voulez définir des exceptions, ajoutez une ligne `overrides` :

```json
{
    "rules": {
        "max-lines-per-function": ["error", 25],
    },
    "overrides": [
        {
            "files": ["components/**"],
            "rules": {
                "max-lines-per-function": ["error", 120]
            }
        }
    ]
}
```

<!-- ignore -->

Rules :

- `"off"` or `0` - turn the rule off
- `"warn"` or `1` - turn the rule on as a warning (doesn’t affect exit code)
- `"error"` or `2` - turn the rule on as an error (exit code is 1 when triggered)

Overrides :

```json
{
    "rules": {
        "max-lines-per-function": [2, 25]
    },
    "overrides": [
        {
            "files": ["components/**", "pages/**"],
            "rules": {
                "max-lines-per-function": [2, { "max": 200 }]
            }
        }
    ]
}
```

Check disable rules :

```bash
git grep eslint-disable
```

Configuration pour la version 9 :

```bash
yarn add -D eslint eslint-plugin-import eslint-plugin-react
```

```js
// eslint.config.mjs
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export default [
    {
        files: ['**/*.{js,jsx,mjs,cjs}'],
        ignores: ['.next/**', 'node_modules/**'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                'window': false,
                'fetch': false,
                'setTimeout': false,
                'clearTimeout': false,
                'setInterval': false,
                'clearInterval': false,
                'process': false,
                'FormData': false,
                'global': false,
                'TextEncoder': false,
                'URL': false,
                'Headers': false,
                'cy': false,
                'beforeAll': false,
                'beforeEach': false,
                'expect': false,
                'it': false,
                'test': false,
                'console': false,
            },
        },
        plugins: {
            react: reactPlugin,
            import: importPlugin
        },
        rules: {
            'no-undef': 'error',
            'no-trailing-spaces': 2,
            'no-unused-vars': ['error', { 'caughtErrorsIgnorePattern': '_' }],
            'quotes': [2, 'single'],
            'import/default': 2,
            'indent': [2, 4, { 'SwitchCase': 1 }],
            'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
            'react/jsx-indent-props': [2, 4],
            'react/jsx-indent': [2, 4],
            'react/jsx-uses-vars': [2],
            'complexity': [2, 6],
            'max-depth': [2, 2],
            'no-multiple-empty-lines': ['error', { 'max': 1 }],
            'padded-blocks': ['error', 'never'],
        },
    },
];
```

Problème, elsint 9 ne supporte pas le style guide de airbnb -> https://github.com/airbnb/javascript/issues/2961

Du coup il y a plein de règles dont j'ai l'habitude qui ne s'appliquent pas...

Désactiver les règles pour tout un fichier :

```js
/* eslint-disable */
```