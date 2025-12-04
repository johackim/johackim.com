---
title: Comment se configurer un tableau de bord maison ?
permalink: comment-configurer-tableau-de-bord-maison
datePublished: 2018-02-12T08:00
dateUpdated: 2018-02-12T08:00
description: Pour afficher tout un tas d'indicateurs clés et statistiques sur un écran, je me suis fabriqué un petit tableau de bord maison sur un Raspberry Pi.
aliases:
  - Comment se configurer un tableau de bord maison ?
publish: true
rss: true
---

Pour afficher tout un tas d'indicateurs clés et statistiques sur un écran, je me suis fabriqué un petit tableau de bord maison sur un Raspberry Pi.

## Introduction

J'aime bien le concept de **Data Driven** (pilotage par la donnée), c'est un moyen simple de prendre des décisions en se basant sur autre chose que de simples hypothèses.

Grâce à ce **dashboard**, je visualise rapidement l'état d'avancement de mes tâches en cours, ce qu'il me reste à faire et mes **objectifs à atteindre** le tout **regroupé à un seul endroit**.

Ce dashboard fait partie de mes sources de **motivation**, je peux me fixer des objectifs qui seront affichés en permanence à côté de moi lorsque je travaille.

Dans mon cas, les données utilisées derrière mon dashboard sont gérées par des solutions **open-source** (raspberry, [taiga](https://taiga.io/), [metabase](http://metabase.com/) et [piwik](https://matomo.org/)) auto-hébergé sur mes propres serveurs dont une grande partie se situe chez moi.

## Installation

**Prérequis** :

- Un **écran** avec entrée HDMI.
- Un **raspberry PI** avec sa **carte SD** et son **alimentation**.
- Un **câble HDMI**.
- Quelques notions en ligne de commande **Linux**.

Niveau hardware, j'ai utilisé un simple [Rasbperry Pi Zero W](https://kubii.fr/fr/pi-zero-w/1851-raspberry-pi-zero-w-3272496006997.html) avec Raspbian comme distribution Linux. Pour installer Raspbian il vous suffit de télécharger le [fichier .img](https://raspberrypi.org/downloads/) et de le graver sur une carte SD avec un logiciel comme [etcher](https://etcher.io/).

![Rasbperry Pi Zero W](https://i.imgur.com/G5MVfJT.jpg)

Une fois votre raspberry branché et démarré, il vous faut exécuter cette commande avec l'utilisateur `pi` pour installer les prérequis :

```bash
curl -L https://git.io/vAxR5 | sudo bash
```

Maintenant, il vous reste plus qu'à éditer le fichier `~/.i3/config` pour renseigner l'URL d'accès à votre dashboard.

L'URL peut provenir de n'importe quel service comme [piwik](https://matomo.org/), [metabase](https://metabase.com/), [kibana](https://elastic.co/products/kibana), [goaccess](https://goaccess.io/), [grafana](https://grafana.com/), [NetData](https://my-netdata.io/) ou [Dashing](http://dashing.io/) etc...

Voilà, votre dashboard s'affichera à chaque démarrage de votre Raspberry Pi !

## Détails de l'installation

Pour les curieux, voilà les détails de ce qu'il se passe derrière l'installation :

```bash
#!/bin/bash

# Install dependencies
sudo apt-get update
sudo apt-get install -y i3 dmenu rxvt-unicode xorg xinit xdotool surf

# Autologin
sudo systemctl enable autologin@.service

# i3 configuration
mkdir -p ~/.i3 && cat > ~/.i3/config << EOF
bindsym $mod+b bar mode toggle
font pango:monospace 8
for_window [class="Surf"] fullscreen
exec --no-startup-id xset -dpms
exec --no-startup-id xset s off
exec --no-startup-id xdotool mousemove 9999 9999
exec --no-startup-id surf -K https://github.com/johackim # URL TO EDIT
EOF
echo 'exec i3' >> ~/.xinitrc
echo '[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && exec startx' > ~/.bash_profile

exit 0
```

Ce code aura simplement pour objectif d'installer un petit gestionnaire de fenêtre **[i3](http://i3wm.org/)** et **surf** en tant que navigateur web très léger.

**xdotool** se chargera de mettre le navigateur en fullscreen avec la touche **F11** quelques secondes après le démarrage de i3.

EDIT: le paramètre `surf -K` sera utilisé pour mettre le navigateur en fullscreen.
Merci [Breizh](https://journalduhacker.net/u/Breizh) ;)

## Mon tableau de bord

Personnellement, j'utilise [Metabase](https://metabase.com/) en tant que tableau de bord pour afficher des statistiques provenant des bases de données de [piwik](https://matomo.org/), [taiga](https://taiga.io/) et [zabbix](https://zabbix.com/). J'ai aussi un petit [script maison](https://github.com/johackim/node-stats) qui parse et stocke en permanence des données provenant de [github](http://github.com/johackim) et [mastodon](https://mastodon.ethibox.fr/@johackim) dans une base de données MySQL.

![Apperçu de mon dashboard](https://i.imgur.com/vzTehLA.jpeg)

Pour le moment, je peux voir des métriques comme :

- L'état d'avancement du sprint en cours ([Scrum](https://wikiwand.com/en/Scrum_(software_development))) ; tâches planifiées (TODO), en cours (DOING) et terminées (DONE).
- Le nombre de visites par mois de [mon blog](https://johackim.com/).
- le nombre de followers [mastodon](https://mastodon.ethibox.fr/@johackim) et [github](https://github.com/johackim/).
- Le nombre de dysfonctionnements de mon infrastructure via [zabbix](https://zabbix.com/).

L'URL publique de mon dashboard Metabase ressemble à ça :

http://192.168.1.50:3000/public/dashboard/df627c68-8020#refresh=60&theme=night

Elle est seulement accessible sur mon réseau local et dispose de deux paramètres ; `refresh=60` pour le nombre de secondes avant chaque rafraichissement et `theme=night` pour le mode nuit.

## Conclusion

Vous pouvez afficher ce que vous voulez sur votre écran: un **tableau de bord** comme dans mon cas, une **vidéo** qui tourne en boucle, une **photo**, un **site internet**, etc...

De mon côté je vais surement remplacer **[Metabase](https://metabase.com/)** par une solution comme **[Elastic](http://elastic.co/)** (je ferai un article à cette occasion). Je trouve que ma solution avec [Metabase](https://metabase.com/) est difficile à maintenir et consomme trop de ressources.

Je pense aussi améliorer la pertinence de mes métriques et en ajouter d'autres :

- Métriques pirates : **AARRR**
- **Velocity chart**
- **Burndown chart**
- Pourcentage de progression de mes **Epics**
- **Taux de disponibilité** de mes sites internet

Et vous ? Il y a quoi derrière votre dashboard ?

Bonne semaine ;)

---

Références :

- [[Hébergement web]]