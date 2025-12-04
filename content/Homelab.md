---
title: Comment créer son datacenter maison (homelab) ?
permalink: comment-creer-son-datacenter-maison
datePublished: 2017-10-27T08:24
dateUpdated: 2017-10-27T08:24
description: Voici un guide d'installation d'un homelab conçu uniquement avec des logiciels open-source afin de vous permettre d'héberger vos sites internet à la maison !
publish: true
rss: true
aliases:
  - Proxmox
---

Après plusieurs semaines de recherches et de tests, je souhaite partager avec vous ce guide d'installation d'un homelab conçu uniquement avec des logiciels open-source afin de vous permettre d'héberger vos sites internet à la maison !

PS: J'envisage par la suite de créer une solution **homelab** **all-in-one** et **plug'n play** afin de permettre aux néophytes d'installer eux-mêmes leur datacenter chez eux sans connaissances particulières. Si vous êtes intéressé par ce projet, n'hésitez pas à renseigner votre adresse mail [sur ce lien](/newsletter) afin d'être informé de sa sortie.

Pour le moment voilà à quoi ressemble mon infrastructure maison :

![Infrastructure](https://i.imgur.com/HPFrm3m.png)

**NOTE** : Je suis chez orange (Sosh plus précisément) et ma livebox ne gère pas le **bridge**, je ne peux donc pas utilisé **pfsense** en tant que routeur, firewall et serveur DHCP. Et je n'ai pas non plus la possibilité d'obtenir une **IP publique fixe**. Je referai un article sur **pfsense** lorsque j'aurai changé de FAI...

## Prérequis

- Un PC avec une connexion internet fera l'affaire. (il existe aussi [les mini PC NUC de Intel](https://intel.com/content/us/en/products/boards-kits/nuc.html) qui ont l'air pas mal).

Pour ma part j'ai utilisé mon vieux [Sony VAIO VPCF21Z1E](https://framapic.org/QaBdvkTz4snV/OIbeUeFPEL2I.jpg) en tant que **Serveur Bare-Metal** sur lequel j'ai installé **proxmox** comme **hyperviseur**. J'y ai démarré une VM (machine virtuelle) avec le reverse proxy **traefik** pour pouvoir router le trafic entrant sur les VMs correspondantes. Je peux désormais démarrer autant de VMs que je veux dans la limite des capacités de mon ordinateur. Dans le cas où les limites sont proches d'être dépassé, proxmox permet de faire du clustering et donne la possibilité de lier d'autres équipements.

Voici selon moi les avantages et désavantages de l'utilisation d'un homelab par rapport à une solution cloud:

## Les avantages

- Protection de la vie privée
- Économies d'argent
- Garder le contrôle de ses données
- Pas de restriction ni de dépendance avec un service tiers
- Impact écologique moindre
- Décentraliser internet

## Les désavantages

- Le bon fonctionnement de votre homelab dépendra de la qualité du réseau / débit de votre connexion internet.
- Votre PC doit rester allumé 24h/24
- Pas de support, vous êtes seul en tant qu'administrateur système (if you break it, you fix it)
- Vous disposez généralement d'une seule adresse IP publique qui n'est pas toujours statique.

Si comme moi vous êtes curieux, bidouilleur, sensible au sujet de la vie privée et que vous souhaitez vous passer des fournisseurs cloud traditionnels comme AWS, OVH, Digital Ocean, Scaleway, Google Cloud Platform et j'en passe alors vous êtes au bon endroit !

## Installation de Proxmox

Dans un premier temps, vous devez télécharger et copier le fichier .iso depuis le [site officiel](https://proxmox.com/en/downloads/category/iso-images-pve) sur une clé USB. De mon côté, j'utilise [etcher](https://etcher.io/) pour créer une clé USB bootable.

Une fois bootée sur votre ordinateur qui fera office de serveur, l'installation commence :

Selectionnez le disque dur de destination (`/dev/sda` dans mon cas).

Selectionnez votre timezone et la langue de votre clavier.

Configurer les paramètres réseau

![proxmox configuration réseau](https://i.imgur.com/0BtefaD.png)

- Reboot

L'installation est déjà terminée. Vous pouvez accéder à la très jolie UI de proxmox via [https://192.168.1.50:8006](https://192.168.1.50:8006) avec l'identifiant **root** et **votre mot de passe**.

Vous pouvez déjà créer des VPS (serveurs privés virtuels) à la demande gratuitement et chez vous !

**Bonus**: proxmox fournit un **catalogue de template** avec tout plein de distributions et services à démarrer en quelques clics (gitlab, etherpad, jenkins, piwik, debian, ubuntu, arch, centos etc...). La partie **Backup** vous permet de planifier la sauvegarde de vos VMs sous forme de snapshots.

## Reverse proxy (traefik) et let's encrypt

Je dispose d'une seule adresse IP publique et les services web que je compte déployer sont répartis sur plusieurs machines virtuelles. **traefik** va router le trafic web entrant sur les différentes VMs.

On créer une VM **traefik** basé sur **debian** puis on autorise l'accès aux ports **80** et **443** en ajoutant deux règles de **port forwarding** sur notre box internet en direction de notre nouvelle VM.

L'installation de **traefik** est très simple, un simple fichier binaire en go à [télécharger](https://github.com/containous/traefik/releases) et exécuter.

```bash
wget -O /usr/local/bin/traefik https://github.com/containous/traefik/releases/download/v1.4.0-rc4/traefik_linux-amd64
chmod + /usr/local/bin/traefik
```

Voilà à quoi ressemble ma configuration pour accéder au blog sur lequel vous vous trouvez actuellement :

```toml
# traefik.toml

defaultEntryPoints = ["http", "https"]

[entryPoints]

  [entryPoints.http]
  address = ":80"
    [entryPoints.http.redirect]
    entryPoint = "https"
  [entryPoints.https]
  address = ":443"
    [entryPoints.https.tls]

[acme]

email = "contact@johackim.com"
storage = "acme.json"
entryPoint = "https"
onDemand = true

[[acme.domains]]
  main = "johackim.com"

[file]

[backends]
  [backends.blog]
    [backends.blog.servers.server]
    url = "http://192.168.1.5:80"

[frontends]
  [frontends.blog]
  passHostHeader = true
  entrypoints = ["http", "https"]
  backend = "blog"
    [frontends.blog.routes.route]
    rule = "Host:johackim.com"
```

Une simple commande permet de démarrer traefik : `traefik -c traefik.toml`

L'avantage de cette configuration c'est qu'elle permet d'automatiser la génération de certificats **let's encrypt**.

## Configuration de DYNDNS

Dans le cas où votre FAI ne vous donne pas la possibilité de disposer d'une IP statique il existe plusieurs méthodes, j'en connais actuellement deux, la première fonctionne avec **ddclient**:

```bash
DEBIAN_FRONTEND=noninteractive apt-get install -y ddclient
```

Voici un exemple de configuration **ddclient** relié à **OVH** :

```conf
# /etc/ddclient.conf

protocol=dyndns2
use=web, web=checkip.dyndns.com
server=ovh.com
login=YOUR_LOGIN
password=YOUR_PASSWORD
johackim.com
```

La seconde méthode fonctionne avec un simple script shell **dyndns.sh:**

```bash
#!/bin/bash

DYNHOST_USER="MY_LOGIN"
DYNHOST_PASSWD="MY_PASSWORD"
DYNHOST_DOMAINS=(mydomain.com mydomain2.com)
OVH_URL="https://ovh.com/nic/update?system=dyndns"

for DYNHOST_DOMAIN in ${DYNHOST_DOMAINS[@]}; do
    curl --user "$DYNHOST_USER:$DYNHOST_PASSWD" "${OVH_URL}&hostname=${DYNHOST_DOMAIN}"
done

exit $?
```

Sans oublié de configurer une tâche cron:

```cron
*/10 * * * * bash /usr/local/bin/dyndns.sh
```

Dans les deux cas il faudra vous créer un identifiant dans la partie **DynHOST** de votre nom de domaine chez OVH.

## Contourner le loopback de la Livebox

Pour ceux qui disposent une livebox et qui aimeraient accéder à leurs services depuis leur réseau local sans être redirigé sur la page d'accueil de la livebox je les invite à se rendre sur [cet article](https://blog.cagedmonster.net/contourner-le-loopback-de-la-livebox/).

## Conclusion

Bon, ce n’est pas encore un AWS maison, mais pour ceux qui rêvent de pouvoir lancer des VPS simplement et automatiser leurs sauvegardes avec uniquement des logiciels open-source c'est déjà un très bon début.

J'ai migré toute mon infrastructure OVH chez moi et je dois avouer que c'est très plaisant ! Je peux augmenté la RAM, CPU et la taille des disques de mes VMs très facilement grâce à proxmox et à moindre cout.

J'utilise cette infrastructure maison pour démarrer tous mes services, à savoir Taiga, Jenkins, Rocket.Chat, Metabase, Sentry, Gogs, Zabbix, Searx, Wallabag, Piwik et le blog que vous lisez actuellement

Pour l'aspect sécurité, à vous d'installer et paramétrer vos firewalls, IPS, hardening ect...

Voilà ! Si vous avez des questions, suggestions ou améliorations à apporter pour faciliter le processus d'installation ou autre, n'hésitez pas à les soumettre dans les commentaires !

---

Références :

- [Déploiement de proxmox ve 5 sur un serveur dédié](https://blog.zwindler.fr/2017/07/11/deploiment-de-proxmox-ve-5-sur-un-serveur-dedie-part-1/)
- [https://reddit.com/r/homelab/](https://reddit.com/r/homelab/)