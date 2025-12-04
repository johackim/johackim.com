---
title: License
permalink: generer-un-fichier-de-licence-license.txt-automatiquement
datePublished: 2021-08-08T19:31
dateUpdated: 2021-08-08T19:31
aliases:
  - LICENSE.txt
  - Licenses logiciel
publish: true
rss: true
---

## Générer un fichier de licence LICENSE.txt automatiquement

Pour générer un fichier de licence automatiquement, il existe l'outil [license](https://github.com/nishanths/license).

Pour l'installer sur Linux :

```bash
go install github.com/nishanths/license/v5@latest

# Ou

git clone https://github.com/nishanths/license
go build
mv license /usr/local/bin/license

# Ou

yay -S --noconfirm nishanths-license-git
```

Une fois installé, pour créer un fichier `LICENSE.txt`, exécutez la commande suivante avec le nom de votre licence en paramètre :

```bash
license gpl-3.0 > LICENSE.txt
```

Pour connaître la liste des licences disponibles :

```bash
license -list
```

## Liste des licenses

- GNU General Public License v3.0
- Apache License 2.0
- BSD 3-Clause "New" or "Revised" License
- CC-BY 4.0 International Public License
- ISC License
- MIT License
- WTFPL (Do What The Fuck You Want To Public License)
- BUSL-1.1 (free to use as long as it is on local. you need to get a license in production)

---

Références :

- https://choosealicense.com/
- https://libraries.io/licenses
- https://spdx.org/licenses/
- https://korben.info/wiki/les_differentes_licences
- https://gnu.org/philosophy/free-sw.fr.html
- https://github.com/marketplace/licensebat