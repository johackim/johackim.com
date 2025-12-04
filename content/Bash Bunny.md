---
title: Comment mener une attaque via une clé USB ?
permalink: comment-menez-facilement-des-attaques-via-usb
datePublished: 2018-02-19T07:57
dateUpdated: 2018-02-19T07:57
description: Existe-t-il un moyen simple de mener une attaque physique sur un ordinateur ou un téléphone simplement à l'aide d'une clé USB en seulement 7 secondes ?
aliases:
  - Attaque USB
publish: true
rss: true
---

Existe-t-il un moyen simple de mener une attaque physique sur un ordinateur ou un téléphone simplement à l'aide d'une clé USB en seulement 7 secondes ?

**Tout ce qui est présenté dans cet article est réalisé uniquement à des fins éducatives et préventives. Il ne doit en aucun cas être utilisé sur un autre équipement que le vôtre, sans quoi vous vous exposerez à des poursuites pénales de la part des propriétaires. Je ne suis en aucun cas responsable des préjudices ou dommages de quelque nature que ce soit pouvant résulter de l’utilisation de ce qui se trouve dans cet article.**

## Bash Bunny ?

![Bash Bunny](https://i.imgur.com/Bxu66a7.jpeg)

**Bash Bunny** est en apparence une simple clé **USB**, en réalité il s'agit d'un ordinateur sous [[Linux]] qui une fois branchée est considéré comme un périphérique de confiance (un clavier, une carte réseau, un port série ou un disque mémoire flash).

Elle peut être branchée sur n'importe quel périphérique doté d'une entrée USB/Micro USB (**Linux**, **Windows**, **OSX**, **Android**, **Raspberry Pi**, **FireTV** ect..).

Une fois branchée elle peut par exemple :

- **Exfiltrer des identifiants**, documents, photos, vidéos, etc...
- Installer une **[Backdoor](https://wikiwand.com/fr/Porte_d%C3%A9rob%C3%A9e)**
- Executer une **[Fork bomb](https://wikiwand.com/fr/Fork_bomb)**
- [Bruteforcer le code à 4 chiffres d'un téléphone](https://youtube.com/watch?v=QCqW6wXkz3Y)
- [etc...](https://github.com/hak5/bashbunny-payloads)

Sachant qu'une [Backdoor](https://wikiwand.com/fr/Porte_d%C3%A9rob%C3%A9e) installé par ce moyen (ou un autre) peut permettre davantage :

- **Activer la Webcam** à distance
- Enregistrer les frappes du clavier à distance (**keylogger**)
- Enregistrer l'**audio** à distance
- **Géolocaliser** votre périphérique à distance
- Observer et **intercepter vos communications réseau**

Nous allons voir dans cet article comment cette clé fonctionne et comment se protéger de ce genre de périphérique USB.

## Comment ça fonctionne ?

Le fonctionnement de cette clé est plutôt simple, à la différence d'une clé USB classique elle dispose d'une **LED RGB** servant à indiquer l'état d'exécution des **payloads**, et d'un **interrupteur à 3 positions**.

![Bash Bunny Modes](https://wiki.bashbunny.com/images/bb_diagram1.png)

Les positions 1 et 2 servent simplement à exécuter nos **payloads** et de permuter entre eux facilement tandis que la position 3 (**Arming Mode**) va nous permettre de les éditer.

Avant tout, je vous conseille de mettre à jour le **firmware** de la clé :

1. [Télécharger le dernier fichier de mise à jour.](https://wiki.bashbunny.com/#!downloads.md)
2. Le copier à la racine de la clé (sans extraire le contenu de l'archive)
3. Débrancher et rebrancher la clé.
4. Attendre 10 minutes jusqu'à ce que la clé clignote bleue.

Chaque **payload** (attaque), est écrit dans un langage simple "**Bunny Script**" composé de fichiers texte à éditer sur la clé :

- payloads/switch1/payload.txt (position 1)
- payloads/switch2/payload.txt (position 2)

Voci un exemple simple de payload :

```bash
#!/bin/bash

# init
LED SETUP
ATTACKMODE HID

# attack
LED ATTACK
RUN UNITY xterm
Q DELAY 1000
Q STRING touch /tmp/owned.txt
Q ENTER
Q STRING exit
Q ENTER
RUN UNITY gedit
Q DELAY 1000
Q STRING "Bonsoir Elliot"

# finish
LED FINISH
```

Dans cet exemple, au moment où l'on va brancher la clé sur un PC linux, un fichier /tmp/owned.txt sera créé et un éditeur de texte sera ouvert avec écrit "Bonsoir Elliot" à l'intérieur.

On remarque dans ce script plusieurs paramètres :

- **ATTACKMODE** pour changer le type d'attaque, ici **HID** pour simuler un clavier.
- **`RUN UNITY <nom_logiciel>`** pour démarrer un logiciel.
- **LED** pour manier les couleurs de la LED.
- **DELAY** pour attendre.
- **ENTER** pour la touche entrée.
- [Voir plus de paramètres](https://github.com/hak5/bashbunny-payloads/blob/master/docs/readme.txt).

Ce payload est là à titre d'exemple, vous pouvez écrire vos payloads ou en consulter d'autres sur ce [dépôt github](https://github.com/hak5/bashbunny-payloads).

## Comment s'en protéger ?

On a vu dans cet article qu'il était très simple d'utiliser ce genre de clé, **je vous conseille fortement de vous en protéger**, il existe plusieurs moyens à ma connaissance :

- **Verouiller votre session utilisateur** pour limiter les interactions clavier.
- **Ne jamais faire confiance** à des clés USB autre que les siennes.
- Installer un utilitaire comme [Usb-canary](https://github.com/errbufferoverfl/usb-canary) (Linux, OSX) qui peut vous envoyer un SMS dès que quelqu'un tente de brancher un périphérique USB sur votre ordinateur durant votre absence.
- **Vérouiller vos entrées USB** avec des [bloqueurs de ports](https://frama.link/22sR4VfY).

Si vous avez d'autres astuces, n'hésitez pas à les poster en commentaire ;)

## Conclusion

Pour ceux qui se le demande, il est possible de reprogrammer le firmware de certaines **clés USB classiques** vendues dans le commerce pour reproduire un fonctionnement similaire à Bash Bunny.

Vous connaissez sans doute sa petite soeur **Rubber Ducky**, la grosse différence que j'ai pu recenser pour le moment est que le Bash Bunny peut émuler plusieurs types d'appareils tandis que le Rubber Ducky peut juste émuler un clavier. Et oui, Bash Bunny est aussi compatible avec les [Ducky Script](https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Duckyscript).

Je n'ai pas encore exploré les modes d'attaques **SERIAL**, **ECM_ETHERNET** et **RNDIS_ETHERNET**, ça fera surement l'objet d'un autre article.

---

Références :

- [https://wiki.bashbunny.com/](https://wiki.bashbunny.com/)
- [https://github.com/hak5/bashbunny-payloads](https://github.com/hak5/bashbunny-payloads)
- [https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Duckyscript](https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Duckyscript)
- [https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Payloads](https://github.com/hak5darren/USB-Rubber-Ducky/wiki/Payloads)