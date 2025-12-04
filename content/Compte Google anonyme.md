---
title: Comment détenir un compte Google anonyme ?
permalink: comment-detenir-un-compte-google-anonyme
datePublished: 2018-01-01T08:00
dateUpdated: 2018-01-01T08:00
description: Est-il possible de s'inscrire sur Google sans divulguer ses informations personnelles (e-mail, téléphone, localisation, adresse IP) ?
publish: true
rss: true
note: 96
---

Est-il possible de s'inscrire sur Google sans divulguer ses informations personnelles (e-mail, téléphone, localisation, adresse IP) ?

Avant tout chose, je tiens à préciser que si vous souhaitez garder votre vie privée, il vaut mieux ne pas utiliser Google du tout, pour ça il existe des [alternatives proposées par Framasoft pour chaque service de Google](https://degooglisons-internet.org/alternative?l=fr).

## Google sait tout sur nous

Une manière simple et rapide de présenter Google est de montrer la liste de leurs produits suivie des données collectées par chacun d'entre eux. Attention, ça peut faire peur.

| Produit                                          | Données collectées                                                                                                                                                                                                                                                                           |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Search (moteur de recherche)              | Questionnements de l’utilisateur et ses centres d’intérêt, ses recherches commerciales ou de voyage.                                                                                                                                                                                         |
| Gmail                                            | Contenu des emails, y compris les pièces jointes, destinataires, contacts, fréquence des échanges.                                                                                                                                                                                           |
| Google Analytics (statistiques)                  | Déplacement de l’internaute sur le web, liste des pages visitées, temps passé. Google peut pister les visiteurs de 88 % des sites web.Il existe une version pour les applications mobiles permettant de suivre tout ce que fait un utilisateur au sein d’une application sur son smartphone. |
| Google Maps                                      | Lieux géographiques intéressant l’utilisateur, itinéraires prévus.                                                                                                                                                                                                                           |
| Smartphone Android                               | Déplacements géographiques, vitesse de déplacement, carnet d’adresses, historique des appels téléphoniques, des SMS, applications installées.                                                                                                                                                |
| Google Calendar                                  | Rendez-vous, lieux, dates, interlocuteurs, sujets de vos rendez-vous (personnels et/ou professionnels).                                                                                                                                                                                      |
| Google Wallet                                    | Numéro de carte bancaire, achats en ligne.                                                                                                                                                                                                                                                   |
| Google Docs & Drive                              | Documents bureautiques (contenu de feuilles de tableur, textes, présentations…).                                                                                                                                                                                                             |
| Google Chrome (navigateur)                       | Mots de passe, historique des sites visités, temps passé sur les sites, fréquence de visite.                                                                                                                                                                                                 |
| Google Photos                                    | Photos, lieux de prise de vue, date et heure de la prise de vue.                                                                                                                                                                                                                             |
| YouTube                                          | Vidéos vues, temps passé devant, moments où l’on fait pause, ce que l’on passe en boucle, vidéos qu’on veut regarder plus tard.                                                                                                                                                              |
| Google Private results (option de Google Search) | Rendez-vous, factures à payer, livraisons en attente, vols en avion, réservations d’hôtels ou de restaurants.                                                                                                                                                                                |
| Nest (Thermostat, détecteurs, caméras)           | Présence à la maison, température, qualité de l’air, consommation d’énergie.                                                                                                                                                                                                                 |

---

Références :

- [Tristan Nitot, surveillance:// - Les libertés au défi du numérique](https://frama.link/wp6X082E)

## S'inscrire sur Google sans communiquer d'informations personnelles

Cela devient de plus en plus complexe de naviguer sur internet tout en gardant son anonymat, il existe une multitude de techniques pour pister les utilisateurs, dont certaines fonctionnent même si vous disposez d'un **VPN** (réseau privé virtuel)...

### Cacher son adresse IP

Pour cacher votre adresse IP il existe plusieurs solutions VPN gratuites comme [vpngate](http://vpngate.net/) ou [vpnbook](https://vpnbook.com/), mais je vous conseille quand même [les solutions VPN payantes](https://privacytools.io/#vpn) qui garantissent plus de vie privée et ne conservent pas de logs.

Une fois que vous détener un VPN, vous devez vérifier lors de son utilisation que votre IP ne fuite pas :

1. Desactiver le WebRTC sur votre navigateur - [Cliquer pour vérifier](https://diafygi.github.io/webrtc-ips/)
2. Utiliser un [autre serveur DNS](https://wikileaks.org/wiki/Alternative_DNS) que celui de votre FAI - [Cliquer pour vérifier](https://dnsleaktest.com/)
3. Désactiver l'ipv6 si votre VPN n'a pas de support ipv6 - [Cliquer pour vérifier](http://ipv6leak.com)
4. [Desactiver le partage de sa géolocalisation sur son navigateur](https://frama.link/WaKuoZfQ)

Adresse IP cachée ou non, votre **navigateur** génère quand même une **empreinte unique** permettant de vous identifier lorsque vous naviguer sur internet. Aller [vérifier sur ce site](https://panopticlick.eff.org/) si vous en êtes protégé. Pour limiter la casse, vous pouvez utiliser le navigateur [tor-browser](https://torproject.org/).

### Vérification du compte e-mail

Google demande un compte e-mail, je vous conseille de donner une adresse [Protonmail](https://protonmail.com/) qui garantit votre vie privée et la sécurité de votre compte.

![Vérification de votre email](https://i.imgur.com/3HokFRm.png)

Autrement vous pouvez aussi essayer une [[Adresse email jetable|solution d'adresse mail jetable]].

### Vérification du numéro de téléphone

C'est pas toujours le cas, mais il y a de fortes chances que Google vous demande un **numéro de téléphone** pour valider votre compte.

![Valider un compte google par SMS](https://i.imgur.com/vfht9VD.png)

Il existe des **solutions de SMS gratuit** comme [smsreceivefree.com](https://smsreceivefree.com) ou [textnow.com](https://textnow.com) pour ne citer qu'eux, ça vous permet de recevoir des SMS depuis leur interface web. Elles marchent avec des services autres que Google, mais là on parle du site numéro 1 mondiale, les numéros proposés par ces services semblent être bloqués.

Si vous n'êtes pas du genre à lâcher l'affaire, vous pouvez vous acheter une **carte SIM prépayée SYMA à 4,90€** (oui la vie privée a un coût) en liquide dans un bureau de tabac.

![Carte SIM SYMA](https://i.imgur.com/gY45yBn.jpeg)

Cette **carte SIM** est **non nominative** et peut être utilisée immédiatement après achat, en revanche il est possible que la ligne soit suspendue si aucun enregistrement (envoi d'une pièce d'identité) n'est fait dans les 15 jours qui suivent. Dans le cas présent, cette carte sera utilisée pour un usage unique afin de juste récupérer le code de vérification de Google.

Une fois acheté et inséré dans votre vieux Nokia 3310 vous devez composer le `*148#` pour connaitre votre numéro de téléphone.

Le code PIN par défaut est le `0000` si on vous le demande.

![](https://i.imgur.com/thWjuCK.png)

Bravo ! Le plus dur est fait, vous avez votre compte, il ne vous reste qu'à désactiver toutes les options qui ne protègent pas votre vie privée.

![Paramètres de vie privée Google](https://i.imgur.com/ZGThYgh.png)

À vous de juger si oui ou non le fait de décocher ces cases garantit que vos données ne sont pas collectées.

## Conclusion

Comme vous avez pu le lire, il n'est pas si évident que ça de naviguer sur internet tout en restant anonyme. Et même avec toutes ces solutions rien ne nous garantit à 100% notre anonymat.

En complément, voici un petit article que j'ai rédigé qui liste [[Checklist privacy|d'autres solutions pour protéger sa vie privée]].

Vous avez d'autres astuces ? N'hésitez pas à les partager en commentaires ;).

---

Références :

- https://rentry.co/nosms