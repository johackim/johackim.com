---
title: CrowdSec
permalink: crowdsec
description: CrowdSec est un pare-feu communautaire open-source pour se protéger des attaques informatiques.
publish: true
rss: true
datePublished: 2024-04-22T10:00:00
dateUpdated: 2024-05-30T10:00:00
---

[CrowdSec](https://github.com/crowdsecurity/crowdsec) est un [[Pare-feu]] communautaire open-source pour se protéger des attaques informatiques.

Il analyse le comportement des visiteurs via les logs et répond de manière adaptée :

- Bloquer l'adresse IP
- Ajouter un captcha
- Ajouter un code HTTP 403
- ect...

Les adresses IP agressives sont envoyées à CrowdSec pour être partagés entre tous les utilisateurs afin d'améliorer la sécurité de chacun.

## Installation

Pour l'installer sur **Ubuntu** ou **Debian** :

```bash
curl -s https://install.crowdsec.net | sudo sh
sudo apt install -y crowdsec
```

Pour l'installer sur **Arch Linux** :

```bash
yay -S --noconfirm crowdsec-bin
```

Pour les autres systèmes, [voir la documentation](https://doc.crowdsec.net/docs/getting_started/install_crowdsec/).

## Désinstallation

```bash
sudo apt purge -y crowdsec crowdsec-firewall-bouncer-iptables
sudo apt autoremove -y
sudo rm -rf /usr/share/crowdsec/
```

## Utilisation classique

CrowdSec a plusieurs composants :

- **Parser** : Analyse les logs pour les transformer en événements.
- **Scenario** : Analyse les événements pour les transformer en décisions.
- **Decision** : Action à effectuer suite à un événement.
- **Bouncer** : Outil pour appliquer les décisions.
- **Collection** : Ensemble de parsers, scenarios et bouncers.

Pour démarrer CrowdSec, il faut lancer le service :

```bash
sudo systemctl start crowdsec
```

Pour bloquer les adresses IP, il faut installer le bouncer iptables (ou nftables) :

```bash
apt install -y crowdsec-firewall-bouncer-iptables # Ubuntu/Debian
# ou
yay -S --noconfirm crowdsec-firewall-bouncer-iptables # Arch Linux

# Démarrer le service
sudo systemctl start crowdsec-firewall-bouncer
```

Pour bannir une adresse IP :

```bash
cscli decisions add -t ban -i <IP>
```

Il n'est pas possible de bannir une IP définitivement, mais vous pouvez mettre une durée de +100ans avec le paramètre `-d 999999h` 😅.

Pour inspecter une attaque :

```bash
cscli alerts inspect -d <id>
```

Et si vous souhaitez relier votre serveur à la Console de CrowdSec (facultatif) :

- Inscrivez-vous gratuitement sur https://app.crowdsec.net/signup
- Exécuter la commande `cscli console enroll <key>` (la clé est affiché sur https://app.crowdsec.net/security-engines)

Cela vous permettra d'ajouter des blocklists facilement.

Autrement, vous pouvez toujours exécuter une commande comme celle-ci :

```bash
# https://github.com/firehol/blocklist-ipsets/
while read -r ip; do cscli decisions add -t ban -i $ip; done < blocklist.txt
```

Et si vous souhaitez whitelister des IPs (ex: [les IPs de Github](https://api.github.com/meta)), éditez le fichier `/etc/crowdsec/parsers/s02-enrich/whitelists.yaml` et relancez le service crowdsec.

Pour avoir un visuel de l'état de crowdsec :

```bash
cscli metrics
```

Si vous rencontrez un faux positif, vous pouvez identifier la raison du bannissement avec `cscli alerts inspect -d <id>` et désactiver le ban avec `cscli decisions remove --id <id>` ou le scénario en question avec `cscli scenarios remove <scenario>`.

Exemples :

```bash
cscli scenarios remove --force crowdsecurity/http-probing
cscli scenarios remove --force crowdsecurity/http-crawl-non_statics
```

## Tester la sécurité

Effectuez 10 connexions ssh échoués d'affilé :

```bash
for i in {1..10}; do ssh fakeuser@<IP_ADDRESS>; done
```

Puis vérifiez les décisions de crowdec :

```bash
sudo cscli decisions list
```

## Utilisation avec Traefik

Pour utiliser CrowdSec avec Traefik, j'utilise ces 2 stacks docker :

- [Traefik](https://github.com/ethibox/awesome-stacks/blob/master/stacks/traefik-crowdsec.yml)
- [Crowdsec](https://github.com/ethibox/awesome-stacks/blob/master/stacks/crowdsec.yml)

Une fois installé, j'ajoute la configuration suivante dans le fichier `/etc/crowdsec/acquis.yaml` à l'intérieur du conteneur Crowdsec :

```txt
filenames:
  - /var/log/traefik/access.log
labels:
  type: traefik
```

Ensuite, je rentre la commande suivante à l'intérieur du conteneur CrowdSec :

```bash
cscli bouncers add traefik-bouncer
```

Et je redémarre la stack docker avec la variable d'environnement `CROWDSEC_BOUNCER_API_KEY` qui contient la clé d'api qui s'affiche en sortie de la commande précédente.

Chaque service relié à Traefik sera protégé par CrowdSec.

Si vous exécutez une commande comme `dirsearch -u https://example.com` sur un de vos sites internet, votre IP sera automatiquement banni pendant 4h.

---

Références :

- [Korben - Découverte et installation de Crowdsec](https://youtu.be/5K7Aj5ya7uI)
- https://crowdsec.net/blog/enhance-docker-compose-security
- https://blog.levassb.ovh/post/crowdsec/
- https://github.com/crowdsecurity/hub/blob/master/collections/crowdsecurity/traefik.yaml
- https://github.com/maxlerebourg/crowdsec-bouncer-traefik-plugin
- https://github.com/fbonalair/traefik-crowdsec-bouncer
- https://app.crowdsec.net/hub/author/crowdsecurity/collections/traefik
- https://blog.stephane-robert.info/docs/securiser/reseaux/crowdsec/