---
title: Restic
permalink: restic
datePublished: 2021-05-17T17:32
dateUpdated: 2024-12-04T10:09:00
publish: true
rss: true
note: 78
---

Pour sauvegarder des données sous Linux, il existe [restic](https://github.com/restic/restic) en tant que logiciel de backups.

Restic peut sauvegarder des données sur différent backends :

- Buckets S3 (minio, scaleway, AWS, etc...)
- SFTP
- Local
- Etc...

Chaque fois que vous lancez la commande `restic backup`, cela créer un nouvel instantané (un "snapshot") immuable qui est une photographie de l'état de vos fichiers à ce moment précis.

Et si vous souhaitez plus de [backends](https://rclone.org/#providers) (Nextcloud, Dropbox, OVH, etc...), il est possible de coupler restic avec [[Rclone]].

## Installation

Pour installer restic sous Debian ou Ubuntu :

```bash
apt update && apt install -y restic
```

Sur Arch Linux :

```bash
sudo pacman -S restic
```

Ou manuellement :

```bash
export RESTIC_VERSION=0.16.4
wget https://github.com/restic/restic/releases/download/v$RESTIC_VERSION/restic_${RESTIC_VERSION}_linux_amd64.bz2
bzip2 -d restic_${RESTIC_VERSION}_linux_amd64.bz2
mv restic_${RESTIC_VERSION}_linux_amd64 /bin/restic
chmod +x /bin/restic
```

## Lancer une sauvegarde vers un bucket S3

Voici un exemple avec une sauvegarde du dossier `~/` vers un bucket S3 de chez Scaleway :

```txt
# ~/.aws/credentials
[default]
aws_access_key_id = <AWS_ACCESS_KEY_ID>
aws_secret_access_key = <AWS_SECRET_ACCESS_KEY>
```

```bash
restic -r s3:s3.fr-par.scw.cloud/<bucket_name> init
```

```bash
restic -r s3:s3.fr-par.scw.cloud/<bucket_name> backup ~/
```

Il est possible de facilement automatiser la sauvegarde via une tâche cron :

```cron
# Sauvegarde du dossier ~/ chaque jour à minuit
0 0 * * * RESTIC_PASSWORD=<PASSWORD> restic -r s3:s3.fr-par.scw.cloud/<bucket_name> backup ~/
```

## Consulter les sauvegardes

```bash
restic -r <remote> snapshots
```

## Restaurer une sauvegarde

```bash
restic -r <remote> restore <id> --target <folder>
```

## Restaurer un fichier spécifique

```bash
restic -r <remote> restore <id> --include <file_path> --target <folder>
```

## Monter une sauvegarde

Pour monter une sauvegarde restic sur un dossier :

```bash
restic -r <remote> mount <folder>
```

## Libérer de l'espace

Pour libérer de l'espace :

```bash
restic -r <remote> forget --keep-within 30d
restic -r <remote> prune
```

## Mettre à jour restic

Pour mettre à jour restic :

```bash
restic self-update
```

## Débloquer l'accès

Si pour une raison ou une autre votre accès est bloqué, exécuter la commande suivante :

```bash
kill <pid>
restic -r <remote> unlock
```

## Mettre à jour le mot de passe d'un repository

```bash
restic -r <remote> key list
restic -r <remote> key add
```

## Connaitre la taille d'un repository

```bash
restic -r <remote> stats
```

## Créer une sauvegarde automatique quotidienne

Créer un service dans le fichier `~/.config/systemd/user/restic.service`:

```txt
[Unit]
Description=Restic Backup
Wants=network-online.target
After=network-online.target

[Service]
Type=oneshot
ExecStart=restic -q backup ${HOME}
# ExecStartPost=curl -sL https://mywebhook.example.com
Environment=RESTIC_REPOSITORY=s3:example.com/mybucket
Environment=RESTIC_PASSWORD=myp@ssw0rd
Environment=HOME=/home/myuser
Restart=on-failure
RestartSec=30
```

Créer un timer dans le fichier `~/.config/systemd/user/restic.timer`:

```txt
[Unit]
Description=Daily Restic Backup Timer

[Timer]
Persistent=true
OnCalendar=daily
RandomizedDelaySec=300

[Install]
WantedBy=timers.target
```

Activez le timer :

```bash
sudo loginctl enable-linger <user>
reboot
systemctl --user daemon-reload
systemctl --user enable --now restic.timer
```