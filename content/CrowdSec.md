---
title: CrowdSec
permalink: crowdsec
description: CrowdSec est un pare-feu communautaire open-source pour se protéger des attaques informatiques.
publish: true
rss: true
datePublished: 2024-04-22T10:00:00
dateUpdated: 2025-12-13T10:00:00
---

[CrowdSec](https://github.com/crowdsecurity/crowdsec) est un [[Pare-feu]] communautaire open-source pour se protéger des attaques informatiques.

Il analyse le comportement des visiteurs via les logs et répond de manière adaptée :

- Bloquer l'adresse IP
- Ajouter un captcha
- Ajouter un code HTTP 403
- etc.

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

Pour le désinstaller :

```bash
sudo apt purge -y crowdsec crowdsec-firewall-bouncer-iptables
sudo apt autoremove -y
sudo rm -rf /usr/share/crowdsec/ /etc/crowdsec/
```

## Initialisation

Pour démarrer CrowdSec, il faut démarrer le service :

```bash
sudo systemctl enable --now crowdsec
```

Par défaut, crowdsec ne fait que lire les logs et afficher des *alertes*.

Pour réellement bloquer les adresses IP suite à une *décision*, il faut installer le *bouncer* iptables :

```bash
apt install -y crowdsec-firewall-bouncer-iptables # Ubuntu/Debian
# Ou
yay -S --noconfirm crowdsec-firewall-bouncer-iptables # Arch Linux

# Démarrer le service
sudo systemctl enable --now crowdsec-firewall-bouncer
```

## Bannir une adresse IP

Pour bannir une adresse IP, voici la commande :

```bash
cscli decisions add -t ban -i <IP>
```

Ou une plage d'adresse IPs :

```bash
cscli decisions add -t ban -r <CIDR>
```

Il n'est pas possible de bannir une IP définitivement, mais vous pouvez utiliser le paramètre `-d 999999h` pour mettre une durée de +100ans.

## Lister les alertes

Vous pouvez lister les attaques détectées par CrowdSec :

```bash
cscli alerts list
```

Et les inspecter plus en détail :

```bash
cscli alerts inspect -d <id>
```

## Console de CrowdSec

Et si vous souhaitez relier votre serveur à la Console de CrowdSec (facultatif) :

- Inscrivez-vous gratuitement sur https://app.crowdsec.net/signup
- Exécuter la commande `cscli console enroll <key>` (la clé est affichée sur https://app.crowdsec.net/security-engines)

Cela vous permettra d'ajouter des blocklists facilement.

## Ajouter une blocklist manuellement

Le plus simple pour ajouter une blocklist, c'est de passer par la [[#Console de CrowdSec|console]].

Mais il est possible d'importer manuellement une blocklist (ex: https://github.com/firehol/blocklist-ipsets/ ou https://github.com/duggytuxy/Data-Shield_IPv4_Blocklist/) :

```bash
# Depuis un fichier local
cscli decisions import --format values -i blocklist.txt

# Depuis une URL
curl -s https://raw.githubusercontent.com/... | cscli decisions import -i -

# Alternative si import non disponible
for ip in $(cat blocklist.txt); do cscli decisions add -t ban -i "$ip"; done
```

## Ajouter une whitelist manuellement

Et si vous souhaitez whitelister des IPs (ex: [les IPs de Github](https://api.github.com/meta)), éditez le fichier `/etc/crowdsec/parsers/s02-enrich/whitelists.yaml` et relancez le service crowdsec.

Vous pouvez aussi créer un fichier `/etc/crowdsec/parsers/s02-enrich/custom-whitelist.yaml`.

Exemple :

```yml
name: custom/zammad-whitelist
description: "Whitelist traffic"
whitelist:
  reason: "Legitimate traffic"
  expression:
    - evt.Line.Raw contains 'zammad'
```

Pour vérifiez que votre whitelist est bien pris en compte, vous pouvez exécuter un `cscli metrics | grep whitelist`.

Créez le fichier `/etc/crowdsec/postoverflows/s01-whitelist/custom-whitelist.yaml` si vous souhaitez l'appliquer uniquement pour un scenario spécifique :

```yml
name: custom/zammad-whitelist
description: "Whitelist traffic"
filter: "evt.Overflow.Alert.Scenario == 'custom/http-crawl-non_statics'"
whitelist:
  reason: "Legitimate traffic"
  expression:
    - evt.Line.Raw contains 'zammad'
```

Vous pouvez vérifier que votre postoverflow existe bien avec `cscli postoverflows list`.

## Voir l'état de CrowdSec

Pour avoir un visuel de l'état de crowdsec :

```bash
cscli metrics
```

## Supprimer les faux positifs

Si vous rencontrez un faux positif, vous pouvez modifier les seuils de tolérance :

1. Identifier la raison du bannissement avec `cscli alerts inspect -d <id>`
2. Ajuster le `leakspeed` (vitesse d'oubli des erreurs), `capacity` (nombre d'erreurs avant ban) ou `filter` du scenario
3. (facultatif) Ou supprimer le scenario en question via `cscli decisions remove --scenario <scenario>`
4. Puis redémarrez avec `systemctl restart crowdsec` ou `kill -1 1` (si docker)
5. Désactiver le ban manuellement avec `cscli decisions remove --id <id>`

Par exemple, j'ai supprimé le lien symbolique `/etc/crowdsec/scenarios/http-generic-bf.yaml` et j'ai créer un nouveau fichier `/etc/crowdsec/scenarios/http-generic-bf-custom.yaml` avec les valeurs suivantes :

```diff
--- /etc/crowdsec/hub/scenarios/crowdsecurity/http-generic-bf.yaml
+++ /etc/crowdsec/scenarios/http-generic-bf-custom.yaml
@@ -21,12 +21,12 @@
 # Generic 401 Authorization Errors
 type: leaky
 #debug: true
-name: LePresidente/http-generic-401-bf
+name: custom/http-generic-401-bf
 description: "Detect generic 401 Authorization error brute force"
 filter: "evt.Meta.log_type == 'http_access-log' && evt.Parsed.verb == 'POST' && evt.Meta.http_status == '401'"
 groupby: evt.Meta.source_ip
-capacity: 5
-leakspeed: "10s"
+capacity: 10
+leakspeed: "5s"
 blackhole: 1m
 labels:
   confidence: 3
@@ -41,12 +41,12 @@
 # Generic 403 Forbidden (Authorization) Errors
 type: leaky
 #debug: true
-name: LePresidente/http-generic-403-bf
+name: custom/http-generic-403-bf
 description: "Detect generic 403 Forbidden (Authorization) error brute force"
 filter: "evt.Meta.log_type == 'http_access-log' && evt.Parsed.verb == 'POST' && evt.Meta.http_status == '403'"
 groupby: evt.Meta.source_ip
-capacity: 5
-leakspeed: "10s"
+capacity: 10
+leakspeed: "5s"
 blackhole: 1m
 labels:
   confidence: 3
```

Pareil pour le scenario `http-crawl-non_statics` :

```diff
--- /etc/crowdsec/hub/scenarios/crowdsecurity/http-crawl-non_statics.yaml
+++ /etc/crowdsec/scenarios/http-crawl-non_statics-custom.yaml
@@ -1,10 +1,10 @@
 type: leaky
-name: crowdsecurity/http-crawl-non_statics
+name: custom/http-crawl-non_statics
 description: "Detect aggressive crawl on non static resources"
 filter: "evt.Meta.log_type in ['http_access-log', 'http_error-log'] && evt.Parsed.static_ressource == 'false' && evt.Parsed.verb in ['GET', 'HEAD']"
 distinct: "evt.Parsed.file_name"
-leakspeed: 0.5s
-capacity: 40
+leakspeed: 0.2s
+capacity: 100
 #debug: true
 #this limits the memory cache (and event_sequences in output) to five events
 cache_size: 5
```

Vos nouveaux scenarios devraient apparaitre dans le retour de la commande suivante :

```bash
cscli metrics | grep custom
```

## Création d'un scenario personnalisé

Créer un fichier (ex: `http-socketio-flood.yaml`) dans le dossier `/etc/crowdsec/scenarios/` avec le contenu suivant :

```yaml
type: leaky
name: custom/socketio-flood
description: "Detect Socket.IO polling flood"
filter: "evt.Meta.log_type in ['http_access-log', 'http_request'] && evt.Parsed.request contains '/socket.io/'"
groupby: "evt.Meta.source_ip"
capacity: 40
leakspeed: "1s"
blackhole: 1m
labels:
 service: http
 type: dos
 remediation: true
```

Ne pas éditer les fichiers dans le dossier `/etc/crowdsec/hub/scenarios/crowdsecurity/` car chaque modification peut être écraser par un simple `cscli hub update`.

## Tester la sécurité de son serveur

Pour vérifier si votre configuration de crowdsec fonctionne correctement vous pouvez simuler des attaques.

Par exemple, simuler des tentatives de connexion SSH échouées :

```bash
for i in {1..10}; do ssh fakeuser@<IP_ADDRESS>; done
```

Ou pour tester la sécurité de votre serveur HTTP(S) :

```bash
for i in {1..50}; do curl -s "https://example.com/non-existent-page-$i"; done
# Ou
nikto -host https://example.com
```

> [!NOTE]
> Effectuer ce test via une autre adresse IP (ex: via un VPN) pour éviter d'être bloqué 😅.

Puis vérifiez les décisions de crowdsec :

```bash
sudo cscli decisions list
```

Si une décision apparait, vous ne devriez plus avoir accès au serveur SSH ou HTTP(S) pendant plusieurs heures.

## Utilisation avec Traefik

Pour utiliser CrowdSec avec Traefik et Docker Swarm, j'utilise ces 2 stacks docker :

- [Traefik](https://github.com/ethibox/awesome-stacks/blob/master/stacks/traefik-crowdsec.yml)
- [Crowdsec](https://github.com/ethibox/awesome-stacks/blob/master/stacks/crowdsec.yml)

Installation de traefik :

```bash
ACCESSLOG=true MIDDLEWARES=crowdsec-bouncer@file ACME_EMAIL=noreply@example.com docker stack deploy -c <(curl -so - https://raw.githubusercontent.com/ethibox/awesome-stacks/master/stacks/traefik.yml) traefik
```

Installation de crowdsec :

```bash
docker stack deploy -c stacks/crowdsec.yml crowdsec
```

Une fois installé, j'ajoute la configuration suivante dans le fichier `/etc/crowdsec/acquis.d/traefik.yaml` à l'intérieur du conteneur Crowdsec :

```txt
filenames:
  - /var/log/traefik/access.json
labels:
  type: traefik
```

J'ajoute un fichier `dynamic.yml` avec le contenu suivant :

```bash
http:
  middlewares:
    crowdsec-bouncer:
      forwardAuth:
        address: http://crowdsec_bouncer:8080/api/v1/forwardAuth
        trustForwardHeader: true
```

Ensuite, je rentre la commande suivante à l'intérieur du conteneur CrowdSec :

```bash
docker exec -it $(docker ps -qf name=crowdsec_crowdsec) cscli bouncers add traefik-bouncer
```

> [!NOTE]
> Il est possible de devoir exécuter `cscli bouncers delete traefik-bouncer` avant pour pouvoir récupérer la clé.

Et je redémarre la stack docker avec la variable d'environnement `CROWDSEC_BOUNCER_API_KEY` qui contient la clé d'api qui s'affiche en sortie de la commande précédente.

Chaque service relié à Traefik sera protégé par CrowdSec.

Si vous exécutez une commande comme `dirsearch -u https://example.com` sur un de vos sites internet, votre IP sera automatiquement banni pendant 4h.

J'ai quelques erreur au démarrage de traefik :

```txt
ERR Error calling http://crowdsec_bouncer:8080/api/v1/forwardAuth error="Get \"http://crowdsec_bouncer:8080/api/v1/forwardAuth\": context canceled" middlewareName=crowdsec-bouncer@file middlewareType=ForwardAuth
```

Mais cela n'empêche pas un bon fonctionnement. Cela semble être des faux positifs.

Je vous conseille d'ajouter une tâche cron avec [[logrotate]] pour limiter la taille des fichiers de log afin d'éviter de saturer votre stockage :

```bash
@daily logrotate -f /etc/logrotate.d/traefik
```

Avec la configuration suivante dans le fichier `/etc/logrotate.d/traefik` :

```txt
/var/log/traefik/access.json {
    rotate 14
    missingok
    notifempty
    create 644 root root
    postrotate
        docker ps -qf name=traefik_traefik | xargs -r docker kill --signal="USR1"
        docker ps -qf name=crowdsec_crowdsec | xargs -r docker kill --signal="HUP"
    endscript
}
```

Et pour éviter d'utiliser la collection `crowdsecurity/sshd`, vu que cela concerne uniquement traefik, je supprime la collection via la commande suivante :

```bash
cscli collections remove --force crowdsecurity/sshd
```

## Tester la configuration crowdsec

Pour éviter d'avoir le service crowdsec qui plante lors du changement, vous pouvez tester votre configuration avant :

```bash
crowdsec -c /etc/crowdsec/config.yaml -t
```

## Installer une nouvelle collection

Si vous avez des bruteforce sur des application spécifique (ex: wordpress), vous pouvez installer des collections :

```bash
cscli collections install crowdsecurity/wordpress
# Ou juste un scenario :
cscli scenarios install crowdsecurity/http-bf-wordpress_bf_xmlrpc
# Ou une liste blanche :
cscli parsers install crowdsecurity/nextcloud-whitelist
```

Possibilité de chercher des collections ou des scenario depuis les pages suivantes :

- https://app.crowdsec.net/hub/collections
- https://app.crowdsec.net/hub/scenarios

## Débloquer une IP

```bash
cscli alert list --ip <ip>
cscli alert inspect <id>
cat /var/log/traefik/access.json | grep <ip>
cscli decisions remove --ip <ip>
```

## Supprimer toutes les décisions

```bash
cscli decisions delete --all
```

## Débugger une requête

```bash
echo $(tail -n1 /var/log/traefik/access.json) | cscli explain --file - --type=json --verbose
```

---

Références :

- [Korben - Découverte et installation de Crowdsec](https://youtu.be/5K7Aj5ya7uI)
- https://docs.crowdsec.net/
- https://crowdsec.net/blog/enhance-docker-compose-security
- https://blog.levassb.ovh/post/crowdsec/
- https://github.com/crowdsecurity/hub/blob/master/collections/crowdsecurity/traefik.yaml
- https://github.com/maxlerebourg/crowdsec-bouncer-traefik-plugin
- https://github.com/fbonalair/traefik-crowdsec-bouncer
- https://app.crowdsec.net/hub/author/crowdsecurity/collections/traefik
- https://blog.stephane-robert.info/docs/securiser/reseaux/crowdsec/
- https://it-connect.fr/reverse-proxy-traefik-integration-de-crowdsec-pour-bloquer-les-attaques/