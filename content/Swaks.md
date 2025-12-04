---
title: Tester l'envoi d'un e-mail en ligne de commande
permalink: tester-envoi-email-ligne-de-commande
datePublished: 2020-08-26T06:00
dateUpdated: 2020-08-26T06:00
aliases:
  - Tester l'envoi d'un e-mail en ligne de commande
description: Comment tester simplement l'envoi d'un e-mail en ligne de commande sur Linux ?
publish: true
rss: true
---

Comment tester simplement l'envoi d'un e-mail en ligne de commande sur [[Linux]] ?

Maintenant que [smtptest](https://github.com/turbodog/python-smtp-mail-sending-tester) commence à se faire vieux, je viens de passer à un outil qui s'appelle [Swaks](https://github.com/jetmore/swaks).

Il se surnomme "**le couteau suisse pour SMTP**" et il est vraiment pratique !

## Installation

Pour l'installer sur Arch Linux c'est très simple :

```bash
sudo pacman -S swaks
```

Pour les autres distributions, vous pouvez directement télécharger le script Perl :

```bash
wget https://jetmore.org/john/code/swaks/files/swaks-20201014.0/swaks
chmod +x swaks
mv swaks /usr/local/bin/
```

## Utilisation

Voilà la commande que j'utilise :

```bash
swaks -au <user> --from <from_address> -ap <password> -s <server>:<port> -tls -a LOGIN --to <to_address>
```

Exemple :

```bash
swaks --from sender@mydomain.com -au sender@mydomain.com -ap p@ssw0rd -s smtp.mydomain.com:587 -tls -a LOGIN --to recipient@example.com
```

Cela va tout simplement **envoyer un e-mail de test à un destinataire** et un code d'erreur sera affiché en cas de problème ;)

Et si vous voulez entrer votre mot de passe dans un prompt sécurisé :

```bash
swaks --from <email> -au <email> -s smtp.example.com:587 --protect-prompt -tls -a LOGIN --to <email>
```

J'espère que ça vous sera utile !

---

Références :

- [[Serveur e-mail]]
- [[E-mail]]