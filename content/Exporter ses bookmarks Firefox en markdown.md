---
datePublished: 2021-09-27T22:29
dateUpdated: 2021-09-27T22:29
permalink: exporter-ses-bookmarks-firefox-en-markdown
publish: true
rss: true
note: 59
---

Pour exporter mes bookmarks de Firefox au format markdown, il faut d'abord récupérer un backup au format JSON :

1. Démarrer Firefox
2. Ouvrer le menu des bookmarks (CTRL+MAJ+O)
3. Récupérer le backup au format JSON (Import and backup > Backup)

Une fois que votre backup au format JSON (`bookmarks-xxxx-xx-xx.json`) est téléchargé sur votre ordinateur, exécutez ce script python :

```python
# script.py

import json
bdict = json.load(open('bookmarks-xxxx-xx-xx.json', 'r'))

def parse_firefox_bookmark(bdict, header=""):
    if 'children' not in bdict.keys():
        try:
            print('*', '[' + bdict['title'] + ']' + '(' + bdict['uri'] + ')') 
        except:
            pass
        return
    print(header, bdict['title'])
    for children in bdict['children']:
        parse_firefox_bookmark(children, header+'#')

parse_firefox_bookmark(bdict)
```

```bash
python script.py > bookmarks.md
```

PS : N'oubliez pas de modifier la date du fichier markdown dans le script (ex: `bookmarks-2021-09-26.json`).

---

Références :

- https://jagan.be/blog/post/shorts/Small-snipet-to-export-Firefox-bookmarks.json-to-markdown/
- [[Navigateur web]]