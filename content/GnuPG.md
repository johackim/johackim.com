---
title: GnuPG
permalink: gnupg
datePublished: 2022-06-16T11:54
dateUpdated: 2024-06-17T16:00:00
aliases:
  - GPG
publish: true
rss: true
note: 86
---

GnuPG (ou GPG) est un outil de chiffrement disponible sur [Linux](https://gnupg.org/), [Windows](https://gpg4win.org/) et [macOS](https://gpgtools.org/).

## Installation

Installation sur Debian ou Ubuntu :

```bash
apt update && apt install -y gpg
```

Installation sur Arch Linux :

```bash
sudo pacman -S gnupg
```

## Initialisation

Pour initialiser GnuPG, il faut créer une clé de chiffrement

Exécuter la commande suivante pour générer une clé de chiffrement :

```bash
gpg --gen-key
```

Durant l'exécution, vous allez devoir définir un nom d'utilisateur, un email et une passphrase.

N'oubliez pas de définir les bon droits pour le dossier `.gnupg` avec un bon `chmod` des familles :

```bash
chmod 600 .gnupg
```

**IMPORTANT** : Le dossier `~/.gnupg/` est votre passphrase est a garder absolument au risque de ne jamais pouvoir déchiffrer vos données chiffrés.

## Lister ses clés GPG

Pour récupérer la liste de ses clés GPG, exécutez la commande suivante :

```bash
gpg --list-secret-keys --keyid-format LONG
```

Le numéro de clé affiché devra être utilisé pour certaines commandes comme `gpg --delete-keys` ou `gpg --edit-key`.

## Lister toutes les clés GPG

```bash
gpg --list-keys --keyid-format LONG
```

## Voir les informations d'un fichier .gpg

```bash
gpg --verbose --decrypt --list-only --dry-run --logger-fd 1 <file.gpg>
```

## Chiffrer un fichier

Pour chiffrer un fichier :

```bash
gpg -e <file>
```

## Chiffrer un fichier au format ASCII

Par défaut, les fichiers sont chiffré au format binaire. Pour chiffer un fichier au format ASCII, exécutez la commande suivante :

```bash
gpg -e -a -o <file>.gpg <file>
```

## Convertir un fichier binaire au format ASCII

```bash
gpg --enarmor <file>.gpg
```

## Déchiffrer un fichier

Poru déchiffrer un fichier :

```bash
gpg -d <file>
```

## Chiffrer un dossier

GnuPG ne permet pas de chiffrer directement un dossier. Cependant, vous pouvez archivez une archive.

Du coup, archivez votre dossier avec un logiciel d'archivage (ex : `zip`, `7z`, `tar.gz` ect...), puis chiffrez le :

```bash
zip -r folder.zip <folder>
gpg -e folder.zip
```

## Supprimer une clé

Pour supprimer une clé :

```bash
gpg --delete-keys <KEY>
```

## Modifier son mot de passe

Pour modifier son mot de passe :

```bash
gpg --edit-key <KEY>
gpg> passwd
gpg> save
```

## Toujours demander le mot de passe

Si vous souhaitez que votre passphrase soit toujours demandé lors du déchiffrement d'un fichier, éditez le fichier `~/.gnupg/gpg-agent.conf` avec les lignes suivantes :

```txt
default-cache-ttl 0
max-cache-ttl 0
```

## Récupérer une clé GPG publique

Pour récupérer une clé publique complète, exécutez la commande suivante :

```bash
gpg --armor --export <KEY_ID>
```

## Changer la date d'expiration d'une clé

Si vous voulez modifier la date d'expiration d'un clé GPG, exécutez la commande suivante :

```bash
gpg --edit-key <KEY>
gpg> expire
gpg> save
```

NOTE: Il est possible que la subkey et non la primary key soit expiré, pour la selectionner, tapez `key <key>` puis `expire`.

**Que se passe-t-il si votre clé GPG expire ?**  

> [!QUOTE] https://g-loaded.eu/2010/11/01/change-expiration-date-gpg-key/
> En théorie, le propriétaire d'une clé privée expirée devrait toujours avoir la possibilité de déchiffrer des données et également être en mesure de signer des données, même si toutes les sous-clés publiques de la paire de clés actuelle ont expiré, car il est toujours possible de réinitialiser la date d'expiration sur le clés publiques actuellement expirées.

## Chiffer avec vim

Installer [vim-gnupg](https://github.com/jamessan/vim-gnupg).

```vim
let g:GPGDefaultRecipients=["yourname@yourdomain.com"]
```

## gpg-tui

Pour gérer plus facilement ses clés, il existe `gpg-tui` :

```bash
sudo pacman -S gpg-tui
```

## Enlever la date d'expiration

```bash
gpg --edit-key <ID>
> expire
> 0
> save
```

> [!NOTE]
> Tapez `key 1` si il s'agit d'une subkey.

---

Références :

- [[Linux]]