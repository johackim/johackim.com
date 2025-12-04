---
datePublished: 2021-08-01T21:31
dateUpdated: 2021-08-01T21:31
permalink: se-connecter-a-un-serveur-irc-avec-weechat
title: Se connecter à un serveur IRC avec Weechat
publish: true
rss: true
aliases:
  - IRC
note: 55
---

## Installer Weechat

```bash
apt install -yq weechat
```

## Démarrez weechat

```bash
weechat
```

## Ajoutez un serveur

```bash
/server add debian irc.debian.org
```

## Lister les serveurs

```bash
/server list
```

## Ajouter un serveur sans SSL

```bash
/server add debian irc.debian.org/6667 -notls
```

## Se connecter dessus

```bash
/connect debian
```

## Lister les channels

```bash
/list
```

## Changer de nom d'utilisateur

```bash
/nick <username>
```

## Changer de channel

Pour changer de fenêtre :

- alt+left
- alt+right

---

Références :

- [[Linux]]