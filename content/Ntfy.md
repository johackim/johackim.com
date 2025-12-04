---
title: Ntfy
permalink: ntfy
description: Ntfy est un logiciel de notification open-source. Il permet d'envoyer et de recevoir des notifications sur n'importe quel appareil (ordinateur, smartphone, tablette, etc.).
datePublished: 2024-01-29T10:00:00
dateUpdated: 2024-01-29T10:00:00
publish: true
rss: true
note: 79
---

[Ntfy](https://ntfy.sh) est un logiciel de notification open-source. Il permet d'envoyer et de recevoir des notifications sur n'importe quel appareil (ordinateur, smartphone, tablette, etc.).

## Installation

Vous pouvez récupérer le fichier binaire `ntfy` depuis le [dépôt GitHub](https://github.com/binwiederhier/ntfy/releases).

Et si vous êtes sur Arch Linux, vous pouvez directement installer le paquet `ntfysh-bin` :

```bash
yay -S --noconfirm ntfysh-bin
```

Ou rendez-vous sur [cette page](https://docs.ntfy.sh/install/) pour voir les différentes méthodes d'installation.

## Envoyer un message

Pour envoyer un message, il faut utiliser la commande `ntfy pub` ou envoyer une requête POST via `curl` sur le serveur ntfy.sh.

```bash
ntfy pub mytopic "This is a message"
```

ou

```bash
curl -d "This is a message" ntfy.sh/mytopic
```

## Recevoir un message

Pour recevoir un message, il faut utiliser la commande `ntfy sub`.

```bash
ntfy sub mytopic
```

Cela va afficher tous les messages au format JSON.

```json
{"topic":"mytopic","message":"This is a message","time":1622656800}
```

## Recevoir les messages avec notify-send

Pour afficher vos notifications directement sur votre environnement de bureau, vous pouvez utiliser la commande `ntfy sub` avec `notify-send`.

```bash
ntfy sub mytopic 'notify-send -t 0 "ntfy" "$m"'
```

## Voir tous les anciens messages

Si vous souhaitez voir l'historique des messages, vous pouvez utiliser le paramètre `-s all`.

```bash
ntfy sub -s all mytopic
```

## Sécuriser les messsages avec un mot de passe

Pour éviter que n'importe qui puisse envoyer ou recevoir des messages, vous pouvez utiliser un mot de passe.

```bash
ntfy publish -u admin:myp@ssw0rd ntfy.example.com/mytopic "This is a message"
```

ou

```bash
curl -u admin:myp@ssw0rd -d "This is a message" https://ntfy.example.com/mytopic
```

Cela implique que vous devez héberger votre propre serveur ntfy.

## Héberger son propre serveur ntfy

Pour héberger votre propre serveur ntfy et ne pas dépendre du serveur ntfy.sh, il faut utiliser la commande `ntfy serve`.

```bash
ntfy serve
```

ou

```bash
docker run -p 80:80 binwiederhier/ntfy serve
```

N'oubliez pas de configurer votre pare-feu pour autoriser les connexions entrantes sur le port 80 (ou 443 si vous utilisez HTTPS).

---

Références :

- https://ntfy.sh