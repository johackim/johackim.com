---
datePublished: 2021-12-26T15:44
dateUpdated: 2022-09-12T11:57
title: Exécutez facilement vos opérations CRUD avec Sequelize
permalink: sequelize
publish: true
rss: true
note: 73
---

Sequelize est un ORM Node.js qui permet de créer, éditer et supprimer des données dans une base de données (SQLite, MySQL, PostgreSQL, etc...).

L'avantage d'un ORM, ce que notre code ne dépend pas uniquement d'un type de de base de donnée.

## Installation

Pour installer sequelize avec SQLite, exécutez la commande suivante :

```bash
yarn add -D sequelize sqlite3
```

## Configuration

Créez un fichier `models.js` avec les détails de votre base de donnée (ex: User).

```js
// models.js

import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: `${__dirname}/db.sqlite`,
    query: { raw: true },
});

export const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
});

User.sync();
```

## Selection

Pour effectuer une requête de type `SELECT` :

```js
const users = await User.findAll();
// ou
const user = User.findOne({ where: { name: 'Marty' } });
```

## Mise à jour

Pour mettre à jour des données :

```js
await User.update({ name: 'Biff' }, { where: { name: 'Marty' } });
```

## Suppression

Pour supprimer des données :

```js
await User.destroy({ force: true, truncate: true, cascade: true });
```

## Création

Pour créer un utilisateur dans la table User, exécutez le code Node.js suivant :

```js
await User.create({ name: 'Marty', email: 'marty@bttf.com' });
```

## Relation many-to-many

Si par exemple, un utilisateur peut avoir plusieurs livres et qu'un livre peut appartenir à plusieurs utilisateurs. Il vous faut créer **une association many-to-many** dans votre fichier `models.js` :

```js
// models.js

export const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: { type: DataTypes.STRING },
});

User.belongsToMany(Book, { through: 'userBooks' });
Book.belongsToMany(User, { through: 'userBooks' });
```

Cela créera une table intérmédiare `userBooks`.

Vous pouvez ensuite créer vos livres de cette manière :

```js
const user = await findOne({ name: 'Marty' });
await user.addBook({ name: 'Back To The Futur' });
```

Et récupérez vos livres de cette manière :

```js
const books = await User.findAll({ where: { name: 'Marty' }, include: Book, raw: false });
```

Ou de cette manière :

```js
const books = await User.findAll({ include: { all: true, nested: true }, raw: false });
```

## Relation one-to-many

```js
User.hasMany(Book);
Book.belongsTo(User);
```

## Activer le mode debug

Si vous voulez voir le détail des requêtes SQL générés, ajouter le paramètre `logging` à votre fonction, exempl :

```js
const users = await User.findAll({ logging: console.log });
```

## Utiliser des fonctions SQL

Si vous avez besoin de faire une recherche avec des fonctions SQL (ex: `lower()`) :

```js
await User.findAll({
    where: Sequelize.where(
        Sequelize.fn('lower', Sequelize.col('name')),
        Sequelize.fn('lower', name),
    ),
});
```

## Définir des champs virtuels

Au lieu de créer directement un champ dans la base de donnée, vous pouvez définir des champs virtuels afin de récupérer des valeurs personnalisés :

```js
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    }
});
```

## Exécuter une requête manuelle

```js
await sequelize.query('UPDATE apps SET updatedAt = :updatedAt WHERE id = :id', {
  replacements: { updatedAt, id },
});
```