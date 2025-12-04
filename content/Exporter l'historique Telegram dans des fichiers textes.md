---
datePublished: 2022-03-20T23:17
dateUpdated: 2022-03-20T23:17
title: Exporter l'historique de ses notes Telegram dans des fichiers textes
permalink: exporter-lhistorique-telegram-dans-des-fichiers-textes
publish: true
rss: true
note: 72
---

Ayant pour habitude de stocker toutes mes [[Note temporaire|notes temporaires]] dans l'application mobile [Telegram](https://telegram.org/), j'ai automatisé l'extraction de mes notes dans mon [[Obsidian]].

## Solution 1 : Exporter les notes dans un seul fichier

La première solution est d'exécuter se script bash après avoir exporter mes messages sauvegardés au format `json` via le menu `Export chat history` de Telegram.

```bash
#!/bin/bash

if [[ ! -f "$1" ]]; then
    echo "usage: telegram-to-text.sh [result.json]"
    exit 1
fi

jq -r '
    .messages[] |
    select(.text != "") |
    {date, text: (if .text|type == "array" then (.text[] | select(. != "") | if .|type == "object" then .text else . end) else .text end)} |
    "\(.date)\n\(.text)\n"' < "$1"
```

```bash
telegram-to-text.sh result.json >> Inbox.md
```

## Solution 2 : Exporter les notes dans plusieurs fichiers

La seconde solution consiste à exporter chaque note dans un dossier `Journal` qui contient toutes mes notes par date (ex: `2022-03-01.md` ou `2022-03-01.txt`).

```bash
#!/bin/bash

if [[ ! -f "$1" || ! -d "$2" ]]; then
    echo "usage: telegram-to-text.sh [result.json] [destination folder]"
    exit 1
fi

MESSAGES=$(jq -r '.messages[] |
    select(.text != "") |
    {
        date: .date[0:10],
        text: (if .text|type == "array" then (.text[] | select(. != "") | if .|type == "object" then .text else . end) else .text end),
    } | @base64' < "$1")

for MESSAGE in $MESSAGES; do
     DATE=$(echo "$MESSAGE" | base64 --decode | jq -r '.date' )
     TEXT=$(echo "$MESSAGE" | base64 --decode | jq -r '.text' )

     echo "$TEXT" >> "${2}/${DATE}.md"
done
```

```bash
telegram-to-text.sh result.json Journal
```

---

Références :

- https://gist.github.com/johackim/88f6ea71811a004e72dc37e9494bb618