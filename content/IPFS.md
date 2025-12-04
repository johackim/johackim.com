---
datePublished: 2021-05-30T19:50
dateUpdated: 2023-08-15T19:50
permalink: ipfs
title: Héberger un site sur le réseau IPFS
publish: true
rss: true
note: 81
---

IPFS est un système de fichiers interplanétaire.

InterPlanetary File System (ou IPFS) est un protocole et un réseau peer-to-peer pour le stockage et le partage de données dans un système de fichiers distribué.

C'est un remplacement au protocole HTTP.

Il ne sauvegarde pas 2 fois le même fichier et garde le même identifiant pour chaque fichier créé.

## Installation

Rendez-vous [sur cette page](https://github.com/ipfs/ipfs-desktop#install) pour installer la version desktop.

Pour installer la version CLI :

```bash
sudo pacman -S kubo
```

## Initialiser un repository local

```bash
ipfs init
```

## Envoyer un fichier

```bash
ipfs add <file>
# Ou
ipfs add <file> --to-files /
```

## Afficher un fichier

```bash
ipfs cat <CID>
```

## Télécharger un fichier

```bash
ipfs get <CID>
```

## Voir les fichier d'un dossier

```bash
ipfs ls <CID>
```

## Supprimer un fichier

```bash
ipfs files rm <file>
```

## Spécifier une api

```bash
ipfs --api /ip4/127.0.0.1/tcp/5001 <command>
```

## Envoyer du texte

```bash
echo "This is my text" | ipfs add
```

## Lister les fichiers

```bash
ipfs files ls
```

## Connaitre le CID d'un nom de domaine

```bash
ipfs name resolve /ipns/example.com
```

## Rafraichir le cache

```bash
ipfs name resolve -n --dhtt 0 /ipns/example.com
```

## Recuperer le hash d'un fichier sans l'envoyer sur IPFS

```bash
ipfs add --only-hash <file>
```

## Récupérer le peer d'un fichier

```bash
ipfs dht findprovs <hash>
```

## Héberger un site sur IPFS

Voici les étapes à suivre pour héberger un site sur le réseau peer-to-peer IPFS :

Créez un dossier (ex: `_site`) avec un fichier HTML à l'intérieur (ex : `index.html`) :

```bash
mkdir _site
echo "hello world" > _site/index.html
```

Envoyez le dossier sur IPFS :

```bash
ipfs add -r _site --to-files /
```

Récupérez le hash CID du dossier :

```bash
ipfs files ls -l
```

Rendez-vous sur `https://ipfs.io/ipfs/<CID>` pour voir votre fichier depuis la passerelle officielle ipfs.io.

## Relier un nom de domaine à un site web hébergé sur IPFS

Vous pouvez utiliser une passerelle IPFS pour relier un nom de domaine classique à votre site.

- Créez une zone DNS TXT `_dnslink.example.com` avec la valeur `dnslink=/ipfs/<CID>`

Vous pouvez ensuite accéder à votre site depuis https://ipfs.io/ipns/example.com/ ou http://example.com.ipns.localhost:8080/ si vous avez ipfs-desktop de lancé sur votre ordinateur.

Déployez votre passerelle IPFS [avec Docker](https://github.com/ethibox/awesome-stacks/blob/master/stacks/ipfs.yml).

- Créez une zone DNS de type A `example.com` qui pointe sur l'ip de votre passerelle.

Si vous changez fréquemment votre site, vous allez devoir changer la zone TXT avec le nouveau CID de votre dossier à chaque fois.

Pour pallier à ce problème :

```bash
ipfs name publish /ipfs/<CID>
```

Puis ajoutez l'identifiant ipns à votre zone DNS :

```bash
_dnslink.example.com. 60 TXT "dnslink=/ipns/<IPNS_ID>"
```

Maintenant, à chaque mise à jour de votre dossier `_site`, exécutez la commande suivante :

```bash
ipfs name publish /ipfs/<CID>
```

## Performances

Niveau performances, il est préférable d'uploader votre site dans la passerelle afin que le contenu soit pinné.

---

Références :

- https://filebase.com/
- https://thebidouilleur.xyz/blog/ipfs/
- https://github.com/ipfs-cluster/ipfs-cluster/
- https://github.com/ipfs-shipyard/ipfs-deploy
- https://ipfs.github.io/public-gateway-checker/
- https://korben.info/ipfs-le-web-permanent.html
- https://fr.wikipedia.org/wiki/InterPlanetary_File_System
- https://developers.cloudflare.com/distributed-web/ipfs-gateway