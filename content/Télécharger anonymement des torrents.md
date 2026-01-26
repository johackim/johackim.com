---
datePublished: 2018-01-22T08:00
dateUpdated: 2018-01-22T08:00
permalink: verifier-ip-telechargement-torrents
title: Comment vérifier que mon adresse IP n'est pas visible lorsque je télécharge des torrents ?
description: Lorsque l'on télécharge des torrents, il se peut que notre adresse IP fuite même lors de l'utilisation d'un VPN. Comment vérifier que mon adresse IP n'est pas visible ?
publish: true
rss: true
aliases:
  - Kill switch
---

Lorsque l'on télécharge des torrents, il se peut que notre adresse IP fuite, même lors de l'utilisation d'un VPN.

Même avec un VPN, si un client torrent n'est pas bien configuré, il est possible que notre adresse IP reste visible.

Pour vérifier si notre adresse IP est bien caché, téléchargez [ce magnet de Torguard](https://torguard.net/checkmytorrentipaddress.php) (le gros bouton vert) depuis votre client torrent.

Si tout se passe bien, l'adresse IP de votre VPN et le nom de votre client torrent devraient s'afficher dans la liste.

Si l'adresse IP affichée n'est pas celle de votre VPN, vous devez modifier les paramètres de votre client.

J'utilise personnellement [qBittorrent](https://github.com/qbittorrent/qBittorrent/). Dans mon cas il suffit de modifier les paramètres avancés :

- **Changer l'interface réseau** utilisée pour télécharger, j'ai pris `tun0` qui correspond à l'interface de mon VPN.
- (facultatif) **Désactiver l'IPv6**, car il n'est pas supporté par mon VPN et peut potentiellement faire fuiter mon adresse IP.

![Qbittorrent paramètres avancés](https://i.imgur.com/gzppLM9.jpg)

- **Activer le mode "Anonymous" de qBittorrent**, ça vous permettra de cacher certaines informations (user-agent, IP, Port, etc...).

![Qbittorrent anonymous mode](https://i.imgur.com/7YRAALb.png)

**NOTE** : Si le service de [Torguard](https://torguard.net/checkmytorrentipaddress.php) ne fonctionne pas, vous pouvez essayer [ipMagnet](http://dev.cbcdn.com/ipmagnet/) ou [TorrentPeek](https://torrentpeek.net).

---

Références :

- [How To See If Your VPN Is Leaking Your IP Address (And How To Stop It)](https://lifehacker.com.au/2015/02/how-to-see-if-your-vpn-is-leaking-your-ip-address-and-how-to-stop-it/)
- [My real location is detected when connected to VPN. How to disable geolocation?](https://ivpn.net/knowledgebase/troubleshooting/my-real-location-is-detected-when-connected-to-vpn-how-to-disable-geolocation/)
- [[Torrent]]