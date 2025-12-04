---
datePublished: 2021-06-07T20:36
dateUpdated: 2024-02-01T03:57
permalink: iptables
description: Iptables est un pare-feu pour Linux. Il permet de bloquer ou d'autoriser des connexions entrantes et sortantes.
publish: true
rss: true
note: 61
---

Iptables est un pare-feu pour Linux. Il permet de bloquer ou d'autoriser des connexions entrantes et sortantes.

## Installation

Pour installer iptables sur Ubuntu/Debian, il faut exécuter la commande suivante :

```bash
sudo apt install -y iptables
```

Sur Arch Linux, il faut exécuter la commande suivante :

```bash
sudo pacman -S iptables
```

## Bloquer toutes les connexions entrantes

Pour bloquer toutes les connexions entrantes, il faut exécuter la commande suivante :

```bash
iptables -P INPUT DROP
```

## Autoriser toutes les connexions sortantes

Pour autoriser toutes les connexions sortantes, il faut exécuter la commande suivante :

```bash
iptables -P OUTPUT ACCEPT
```

## Autoriser les connexions provenant de l'interface de loopback

L'interface de loopback permet de communiquer avec le serveur lui-même via l'adresse IP 127.0.0.1.

```bash
iptables -A INPUT -i lo -j ACCEPT
```

## Autoriser le protocole ICMP

Le protocole ICMP permet de communiquer avec le serveur via la commande `ping`.

Pour l'autoriser, il faut exécuter la commande suivante :

```bash
iptables -A INPUT -p icmp -j ACCEPT
```

## Autoriser un port spécifique

Pour autoriser un port spécifique (ex: 22 pour SSH), il faut exécuter la commande suivante :

```bash
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

## Autoriser un nouveau port

Lorsque tous les ports sont bloqués, pour autoriser un nouveau port, il faut exécuter les commandes suivantes :

```bash
iptables -A INPUT -p tcp -m tcp --dport <new_port> -j ACCEPT
iptables -A INPUT -j DROP
iptables -L INPUT --line-numbers # Récupérer l'ID de l'ancienne règle de DROP
iptables -D INPUT <id> # Supprimer l'anciènne règle de DROP
```

## Persister la configuration

Pour persister la configuration et permettre à iptables de se lancer au démarrage :

```bash
iptables-save > /etc/iptables/iptables.rules
sudo systemctl enable --now iptables.service
```

## Vider toutes les règles iptables

Pour vider toutes les règles iptables, il faut exécuter les commandes suivantes :

```bash
iptables -F
iptables -F -t mangle
iptables -F -t nat 
iptables -X
iptables -X -t mangle
iptables -X -t nat
```

## Ma configuration personnelle

Voici ma configuration personnelle :

```bash
iptables -F
iptables -F -t mangle
iptables -F -t nat 
iptables -X
iptables -X -t mangle
iptables -X -t nat
iptables -F INPUT
iptables -A INPUT -i lo -j ACCEPT
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
iptables -A INPUT -j DROP
iptables-save > /etc/iptables/iptables.rules
sudo systemctl enable --now iptables.service
```

Elle permet de bloquer toutes les connexions entrantes.