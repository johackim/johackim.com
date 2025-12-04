---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: kopia
publish: true
rss: true
note: 54
---

[Kopia](https://github.com/kopia/kopia) est un logiciel de sauvegarde disponible sur Windows, macOS et Linux.

## Initialiser un dépôt

```bash
kopia repository create s3 --bucket=<bucket> --access-key=<access_key> --secret-access-key=<secret_key> --endpoint <endpoint>
```

## Créer une sauvegarde

```bash
kopia snapshot create <dossier|fichier>
```

## Monter un dépôt

```bash
kopia mount all <dossier>
kopia mount <snapshot_id> <dossier>
```

## Se déconnecter d'un dépôt

```bash
kopia repository disconnect
```

## Se connecter à un dépôt

```bash
kopia repository connect s3 --bucket=<bucket> --access-key=<access_key> --secret-access-key=<secret_key> --endpoint <endpoint>
```

## Lister les sauvegardes

```bash
kopia snapshot list
```

## Lister les fichier d'une sauvegarde

```bash
kapia ls -l <snpashot_id>
```

## Supprimer une sauvegarde

```bash
kopia snapshot delete <snapshot_id> --delete
```

## Changer le type de compression

```bash
kopia policy set --global --compression=pgzip
```