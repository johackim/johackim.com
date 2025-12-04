---
title: Rclone
permalink: rclone
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
publish: true
rss: true
note: 78
---

[Rclone](https://rclone.org/) est un outil de backups open-source disponible sur Linux, macOS et Windows.

## Installation

Vous pouvez l'installer manuellement :

```bash
wget https://downloads.rclone.org/rclone-current-linux-amd64.zip
unzip rclone-current-linux-amd64.zip
sudo mv rclone-*-linux-amd64/rclone /usr/local/bin
sudo chmod +x /usr/local/bin/rclone
```

Ou via cette commande si vous êtes sur Arch Linux :

```bash
sudo pacman -S rclone
```

## Configuration

```bash
rclone config
```

## Configurer un stockage chiffré

```bash
rclone config # Choisir "crypt" (11) comme type de stockage
```

## Voir la liste des remotes

```bash
rclone listremote
```

## Voir la liste les dossiers/buckets

```bash
rclone lsd <remote>:
```

## Voir la liste des fichiers

```bash
rclone ls <remote>:
```

## Monter un répertoire

```bash
rclone mount <remote>:/ <folder>
```

## Monter un répertoire en tâche de fond

```bash
rclone mount --detach <remote>:/ <folder>
```

## Démonter un répertoire

```bash
fusermount -u <path>
```

## Pour monter un répertoire avec un meilleur accès en lecture

```bash
rclone mount --vfs-cache-mode full <remote>:/ <folder>
```

## Copier des données d'un dossier à une source

```bash
rclone copy --progress <folder> <remote>:/
```

## Copier des données d'une source à une autre

```bash
rclone copy --progress <source>:/ <dest>:/
```

## Synchroniser deux sources avec les mêmes fichiers

> [!QUOTE] https://rclone.org/commands/rclone_sync/
> Sync the source to the destination, changing the destination only.

```bash
rclone sync --progress <source>:/ <remote>:/
```

## Chiffrer la configuration rclone

```bash
rclone config # Set configuration password
```

## Vérifier la correspondance entre source et destination

```bash
rclone check <source>:/ <dest>:/
rclone check --size-only --one-way <source>:/ <dest>:/ # Check rapide
```

## Récupérer un fichier anciennement versionné dans un bucket B2 chez backblaze

```bash
rclone ls --b2-versions <remote>:
rclone copy --progress --b2-versions <remote>:<file> .
```

## Supprimer les anciennes versions d'un fichier versionné dans un bucket B2 chez backblaze

```bash
rclone cleanup --b2-versions backblaze-crypt:/file.txt
```

## Déplacer un dossier

```bash
rclone move --progress --create-empty-src-dirs --delete-empty-src-dirs <source>:/path <dest>:/path
```

## Autoriser d'autres applications à utiliser rclone

```bash
rclone mount --allow-other <remote>:/ <folder>
```

## Tester la connexion d'un remote

Exemple avec Mega.nz :

```bash
rclone -vv --dump-headers
rclone -vv about --mega-debug --dump=bodies --retries=1 --low-level-retries=1 mega:/
```

## Voir la taille d'un remote

```bash
rclone size <remote>:/
```

## Regarder un fichier video distant

```bash
rclone cat <remote>:/<bucket>/<file.mp4> | mpv -
```