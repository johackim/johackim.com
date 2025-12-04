---
datePublished: 2022-06-16T11:53
dateUpdated: 2023-12-23T12:39:00
permalink: bloquer-les-publicites
publish: true
rss: true
aliases:
  - Adblocking
  - Adblocker
---

Pour bloquer les publicités intempestives d'un smartphone, d'un ordinateur ou d'une smart TV il y a plusieurs moyens.

Pour un smartphone ou un ordinateur, le moyen le plus simple est d'installer une extension sur votre navigateur web (Firefox, Chrome, Chromium, etc...).

L'extension la plus efficace pour ça est [uBlock Origin](https://ublockorigin.com/fr). Elle est gratuite et open-source.

Une fois installé, les pubs ne seront plus affichés lorsque vous naviguez sur internet. Même les publicités vidéos sur YouTube.

Et en supplément, vous pouvez installer des listes de blocage dans les paramètres de uBlock avec le bouton "Import" tout en bas :

```txt
https://raw.githubusercontent.com/badmojr/1Hosts/master/Lite/adblock.txt
https://raw.githubusercontent.com/sjhgvr/oisd/refs/heads/main/abp_big.txt
https://raw.githubusercontent.com/liamengland1/miscfilters/master/antipaywall.txt
https://raw.githubusercontent.com/hagezi/dns-blocklists/main/adblock/ultimate.txt
https://raw.githubusercontent.com/yourduskquibbles/webannoyances/master/ultralist.txt
https://raw.githubusercontent.com/liamengland1/miscfilters/master/amazonannoyances.txt
https://raw.githubusercontent.com/laylavish/uBlockOrigin-HUGE-AI-Blocklist/main/list.txt
```

Vous pouvez aussi ajouter des filtres personnalisés comme celui-ci :

```txt
x.com##[aria-label$="trending now" i]
```

Ce filtre permet de supprimer le bloc qui affiche les tendances.

PS : Un autre moyen est d'utiliser [[NextDNS]], cette solution elle permet de bloquer toutes les requêtes en destinations des services de publicités ou de certaines grandes entreprises comme Google ou Facebook.

---

Références :

- https://letsblock.it/
- https://bloquelapub.net/
- https://fmhy.net/storage#dns-filters
- https://fmhy.net/storage#ublock-filters
- https://fmhy.net/adblockvpnguide#adblock-filters
- https://fmhy.net/adblockvpnguide#dns-adblocking
- https://abelhadigital.com/hostsman/
- https://github.com/OhMyGuus/I-Still-Dont-Care-About-Cookies
- https://github.com/FastForwardTeam/FastForward
- https://github.com/hagezi/dns-blocklists
- https://github.com/Lissy93/awesome-privacy#host-block-lists
- https://github.com/StevenBlack/hosts
- https://github.com/blocklistproject/Lists
- https://github.com/topics/blocklist
- https://github.com/AdAway/AdAway
- https://github.com/AdguardTeam/AdGuardExtra
- https://github.com/ReVanced/revanced-patches
- https://github.com/yokoffing/filterlists
- https://github.com/laylavish/uBlockOrigin-HUGE-AI-Blocklist
- https://github.com/anfragment/zen
- https://github.com/gijsdev/ublock-hide-yt-shorts/
- https://blog.cloudflare.com/introducing-1-1-1-1-for-families
- https://reddit.com/r/uBlockOrigin/
- https://oisd.nl