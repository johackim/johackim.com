---
datePublished: 2021-06-27T19:19:00
dateUpdated: 2023-12-26T19:43:00
title: Tor
aliases:
  - Tor browser
permalink: tor
publish: true
rss: true
---

Tor est un logiciel libre et open-source pour communiquer de manière anonyme via un réseau superposé du même nom.

## Installer le navigateur Tor

Pour installer le navigateur, rendez-vous [sur le site officiel](https://torproject.org/fr/download/) :

```bash
wget https://www.torproject.org/dist/torbrowser/14.0.4/tor-browser-linux-x86_64-14.0.4.tar.xz
tar xvf tor-browser-linux-x86_64-14.0.4.tar.xz
sudo mv tor-browser/Browser/ /opt/tor-browser
sudo ln -s /opt/tor-browser/start-tor-browser /usr/local/bin/tor-browser
```

Pour l'installer sur Arch Linux :

```bash
yay -S --noconfirm tor-browser-bin
```

Pour l'installer sur Debian ou Ubuntu :

```bash
sudo apt install torbrowser-launcher
```

## Créer un site sur le réseau Tor

Installer le réseau Tor sur votre système Linux :

```bash
sudo pacman -S tor
```

Configurez le pour qu'il créer un nom de domaine au format `.onion` dans le dossier `/var/lib/tor/hidden_service/` et écoute votre port `80` :

```bash
sudo sed -i -e '0,/#HiddenServiceDir/s/#HiddenServiceDir/HiddenServiceDir/' /etc/tor/torrc
sudo sed -i -e '0,/#HiddenServicePort/s/#HiddenServicePort/HiddenServicePort/' /etc/tor/torrc
sudo systemctl start tor
```

Récupérer votre nom de domaine au format `.onion` :

```bash
sudo cat /var/lib/tor/hidden_service/hostname
```

Créer votre site internet :

```bash
echo 'Hello World' > index.html
```

Démarrer votre serveur web sur le port `80` :

```bash
sudo php -S 127.0.0.1:80
```

Votre site est désormais accessible sur le réseau Tor via un nom de domaine au format `.onion` (ex: `https://jbluqqimtgcf37fulkqa.onion/`).

## Débugger le démarrage de Tor-browser

Si vous avez un problème de démarrage, lancez la commande suivante :

```bash
./start-tor-browser --verbose
```

---

Références :

- [[Vie privée]]
- https://github.com/torserv/torserv
- https://gitlab.torproject.org/tpo/core/oniux