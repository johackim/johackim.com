---
title: Asdf
permalink: asdf
datePublished: 2022-06-16T11:53
dateUpdated: 2025-03-08T09:28:00
publish: true
rss: true
---

[Asdf](https://github.com/asdf-vm/asdf) est un gestionnaire de version (version manager) pour Python, Node.js, Ruby, etc. Il permet de changer de version pour chaque langage de programmation sans se prendre la tête.

## Installation

Si vous êtes sur Arch Linux :

```bash
yay -S --noconfirm asdf-vm
```

Puis ajoutez les 2 lignes suivantes dans votre fichier `~/.bashrc` ou `~/.zshrc`.

```bash
export ASDF_DATA_DIR=$HOME/.asdf
export PATH=$PATH:$ASDF_DATA_DIR/shims
```

## Utilisation

Pour installer un plugin (Node.js, Python, Ruby, etc...), utilisez la commande suivante :

```bash
asdf plugin add nodejs
```

Pour lister toutes les versions de Node.js :

```bash
asdf list all nodejs
```

Pour installer une version spécifique de Node.js :

```bash
asdf install nodejs 22.19.0
```

Pour définir une version globale par défaut :

```bash
asdf set -u nodejs 22.19.0
```

Pour définir une version locale :

```bash
asdf set nodejs 22.19.0
```

Pour connaitre la version en cours :

```bash
asdf current
```

Revenir à la version système d'origine :

```bash
asdf set -u nodejs system
```

Lorsque vous installer un package npm global (ex : `npm i -g yarn`), n'oubliez pas d'exécuter la commande suivante pour pouvoir accéder au package :

```bash
asdf reshim nodejs
```

> [!NOTE]
> Avec Python, si vous rencontrez une erreur lors du lancement d'une commande `pip install`, exécutez là de cette manière : `sudo -E pip install --break-system-packages <package>`.

---

Références :

- https://github.com/asdf-vm/asdf