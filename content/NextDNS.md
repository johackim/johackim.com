---
title: Nextdns
permalink: nextdns
datePublished: 2021-10-17T22:19
dateUpdated: 2021-10-17T22:19
publish: true
rss: true
---

[NextDNS](https://nextdns.io/?from=wrbpy5cs) est un outil très pratique pour bloquer certains sites ou régies publicitaires. Une fois configuré, vous pouvez empêcher tous les services de Google ou Facebook de fonctionner sur votre machine.

## Installation

Si vous êtes sur **Ubuntu** ou **Debian** :

```bash
sh -c "$(curl -sL https://nextdns.io/install)"
```

Si vous êtes sur **Arch Linux** :

```bash
yay -S --noconfirm nextdns-bin
```

Si vous êtes sur **Windows**, téléchargez [NextDNS pour Windows](https://nextdns.io/download/windows/stable).

Si vous êtes sur **macOS**, téléchargez [NextDNS pour macOS](https://apps.apple.com/app/nextdns/id1464122853).

## Utilisation

Démarrez nextdns en exécutant la commande suivante avec [votre identifiant](https://my.nextdns.io/) :

```bash
sudo nextdns install -config <ID> -auto-activate -report-client-info
```

PS : Dans le cas où, la commande de démarrage ne fonctionne pas. Changez la ligne `listen localhost:53` en `127.0.0.1:53` dans le fichier de configuration `/etc/nextdns.conf`.

## Configurer la page de blocage par défaut

Lorsqu’un site est bloqué par NextDNS cela redirige l'IP original sur une IP géré par NextDNS

Du coup si vous voulez avoir une belle page qui s'affiche lorsqu’un site est bloqué il faut ajouter leur certificat SSL sur votre machine.

[Téléchargez le certificat SSL](https://nextdns.io/ca) et ajoutez-le à votre navigateur.

Voici les [instructions à suivre pour ajouter le certificat à votre navigateur](https://help.nextdns.io/t/g9hmv0a/how-to-install-and-trust-nextdns-root-ca).