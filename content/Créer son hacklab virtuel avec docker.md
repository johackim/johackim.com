---
title: Créer son hacklab virtuel avec docker
permalink: creer-hacklab-virtuel-docker
datePublished: 2017-12-18T08:00
dateUpdated: 2017-12-18T08:00
description: Pour tester la sécurité de mes serveurs et sites internet, je me suis configuré un hacklab sous docker en tant qu'environnement de pentesting.
publish: true
rss: true
note: 96
---

Pour tester la sécurité de mes serveurs et sites internet, je me suis configuré un **hacklab** sous **docker** en tant qu'environnement de **pentesting**. Je peux désormais réaliser mes **tests d'intrusions** depuis tout type d'environnement ([[Linux]], Mac OS, Windows).

Voici mon **hacklab** : [http://github.com/johackim/docker-hacklab](http://github.com/johackim/docker-hacklab)

![Hacklab](https://i.imgur.com/DOwUMHk.png)

Je regroupe dans cet environnement virtuel un ensemble d'outils qui me permet de réaliser très rapidement des actions de **pentest**. Une simple commande me permet de démarrer instantanément mon **environnement virtuel**.

```bash
docker run --name hacklab --net=host --privileged -it ston3o/docker-hacklab zsh
```

[Ce dépôt github](http://github.com/johackim/docker-hacklab) recense toutes les **techniques** et **outils** me permettant de mener à bien mes **pentest**.

## 1. README

Je recense toutes les ressources que je juge utile dans [le fichier README.md](https://github.com/johackim/docker-hacklab/blob/master/README.md) que j'améliore au fur et à mesure de mes découvertes, on y trouve actuellement plein de ressources sur le thème de la sécurité :

- [Des bases de données d'exploits](https://github.com/johackim/docker-hacklab/blob/master/README.md#exploit-database).
- [D'autres commandes docker utiles](https://github.com/johackim/docker-hacklab#other-useful-docker-commands)
- [Des moteurs de recherche d'équipements connectés](https://github.com/johackim/docker-hacklab#search-engines)
- Des sites de doxing
- Des blogs et chaines YouTube
- Des dépôts github

## 2. Cheats

![](https://i.imgur.com/TyIYrzj.png)

[Cheat](https://github.com/chrisallenlane/cheat) est très pratique pour gérer ses **aide-mémoires**.

Si par exemple je ne me souviens plus des commandes du framework **metasploit** :

```bash
$ cheat metasploit

# To show all exploits that for a vulnerability
grep <vulnerability> show exploits

# To select an exploit to use
use <exploit>

# To see the current settings for a selected exploit
show options

# To see compatible payloads for a selected exploit
show payloads

# To set the payload for a selected exploit
set payload <payload>

# To set setting for a selected exploit 
set <option> <value>

# To run the exploit
exploit
```

On peut aussi éditer ou chercher un aide mémoire.

```bash
cheat -e <name> # Editer un aide mémoire
cheat -s <word> # Chercher un mot dans nos aide-mémoires
```

## 3. Dockerfile

Mon hacklab reprend une image docker officielle de kali auquel j'ai ajouté tous mes outils sous forme de paquets ou dépôts github que je regroupe sous plusieurs catégories dans un fichier [Dockerfile](https://github.com/johackim/docker-hacklab/blob/master/Dockerfile) :

```bash
# Footprinting / Information-Gathering / OSINT / Fingerprint
# AV Evasion / Dropper
# Vulnerability Scanner (SQL, XSS, LFI, RFI etc...)
# Pentest Framework
# MITM / ARP poisoning / Spoofing / Sniffing
# Email Spoofing
# Crack password
# Hash Manipulation
# SQL Injection
# Phishing
# DOS Tools
# Wireless networks
# Reverse Engineering
# Backdoor / Remote Access Trojan (RAT)
# Search exploit
# Post exploitation
# Privilege escalation
# Forensic
# Geolocalisation
# Shellcode
# Wordpress
# Bypass CloudFlare
# Steganography
# Honeypot
# Reverse shell
# Detect WAF
# Remove file metadata
# Disassembler / Decompiler
# Fuzzing
# Paquet manipulation
```

Je n'ai pas automatisé les procédures d'installation de tous les outils, n'ayant pas encore trouvé le temps de le faire j'ai simplement cloné les dépôts. À chaque découverte d'un outil de **pentesting** que je juge utile, je prends quelques secondes pour l'ajouter dans ce **Dockerfile**.

Vous pouvez reprendre la base de mon **Dockerfile** et ajouter vos propres outils si vous le souhaitez.

## 4. Alias

Pour simplifier son utilisation, je me suis créé un **alias**. Il contient un **volume docker** pour partager des fichiers entre mon host et le container docker.

```bash
alias hacklab='docker run -d --name hacklab --net=host --privileged=true -v /tmp:/mnt -it ston3o/docker-hacklab zsh > /dev/null 2>&1; docker start hacklab > /dev/null; docker exec -it hacklab zsh'
```

Grâce à ça je peux démarrer mon hacklab avec **une simple commande**.

```bash
hacklab
```

Il existe aussi une technique (**non conseillé pour des raisons de sécurité**) qui permet de lancer des applications avec interface graphique depuis un container docker.

```bash
docker run --env="DISPLAY" --env="QT_X11_NO_MITSHM=1" --volume="/tmp/.X11-unix:/tmp/.X11-unix:rw" ston3o/docker-hacklab
xhost +local:root
```

## 5. Sources d'informations

On n’oublie pas les petits flux RSS qui nous permettent de rester informés des derniers outils et techniques de pentest. C'est en partie grâce à ces sources d'informations que mon Dockerfile a pu évoluer :

### Sites français

- [http://homputersecurity.com/](http://homputersecurity.com/)
- [http://comptoirsecu.fr/](http://comptoirsecu.fr/)
- [https://nolimitsecu.fr/](https://nolimitsecu.fr/)

### Sites anglais

- [http://null-byte.wonderhowto.com/](http://null-byte.wonderhowto.com/)
- [https://kitploit.com/](https://kitploit.com/)
- [https://n0where.net/](https://n0where.net/)
- [http://hackingarticles.in/](http://hackingarticles.in/)
- [https://pentestlab.blog/](https://pentestlab.blog/)
- [http://haxf4rall.com/](http://haxf4rall.com/)

## Conclusion

J'utilise ce **hacklab** pour mon usage personnel, vous pouvez vous en servir, vous en inspirer ou bien créer le vôtre en partant de zéro.

Ce **hacklab** me permet de regrouper toutes mes techniques, connaissances et découvertes dans le domaine de la **sécurité**. Tout ça est regroupé dans un unique espace de travail plutôt agréable à utiliser.

**Si vous aimez, n'hésitez pas à ajouter une star sur [le dépôt github](https://github.com/johackim/docker-hacklab) et à me suivre sur [mastodon](http://mastodon.ethibox.fr/@johackim).**

Bonne semaine à vous ;)

---

Références :

- [[Cybersécurité]]