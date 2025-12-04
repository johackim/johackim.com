---
datePublished: 2021-05-18T21:17
dateUpdated: 2021-05-18T21:17
permalink: ids
aliases:
  - Système de détection d'intrusion
publish: true
rss: true
note: 67
---

Un **système de détection d'intrusion** (ou **IDS** : Intrusion Detection System) est un logiciel utilisé pour monitorer et détecter les activités anormales ou suspectes sur un réseau ou un système de fichier.

De manière générale, il existe 2 types d'IDS ;

1. Les Systèmes de détection d'intrusion réseau (ou **NIDS** : Network Intrusion Detection System) ; ceux qui analysent le trafic réseau entrant.

2. Les Systèmes de détection d'intrusion hôtes (ou **HIDS** : Host-based Intrusion Detection System) ; ceux qui analysent les systèmes de fichier.

Concernant les **méthodes de détection d'intrusion**, elles sont généralement classifiées en deux catégories :

- **Détection basée sur les signatures** : l'IDS basé sur les signatures surveille les paquets dans le réseau et les compare avec des modèles d'attaque préconfigurés et prédéterminés appelés signatures.

- **Détection basée sur les anomalies** : l'IDS basé sur des anomalies surveillera le trafic réseau et le comparera à une base de référence établie. La ligne de base identifiera ce qui est «normal» pour ce réseau - quel type de bande passante est généralement utilisé et quels protocoles sont utilisés.

Les IDS les plus populaires sont :

- [Snort](https://github.com/snort3/snort3)
- [Suricata](https://github.com/OISF/suricata)
- [fail2ban](https://github.com/fail2ban/fail2ban)
- [Zeek](https://github.com/zeek/zeek)
- [OSSEC](https://github.com/ossec/ossec-hids)
- [Wazuh](https://github.com/wazuh/wazuh)

Il existe aussi des distributions qui intègrent un IDS :

- [Security Onion](https://github.com/Security-Onion-Solutions/securityonion)
- [SELKS](https://github.com/StamusNetworks/SELKS)