---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: gerer-un-stockage-zapier-avec-curl
publish: true
rss: true
---

Zapier permet de stocker et de récupérer des données dans un mini-espace de stockage appelé [Storage by Zapier](https://zapier.com/help/doc/how-get-started-storage-zapier).

Personnellement, je me sers de cet espace de stockage pour stocker les données provenant des tâches Zapier, exemple : une liste de tweets qui s'autopublie sur Twitter.

Il est possible de récupérer le contenu d'un stockage Zapier avec une simple commande Linux curl :

```bash
curl -s https://store.zapier.com/api/records\?secret\=<uuid_secret_key>
```

Et pour ajouter des données à un stockage Zapier :

```bash
curl -s -X POST -H "Content-Type: application/json" -d '{"list": ["item1", "item2"]}' https://store.zapier.com/api/records\?secret\=<uuid_secret_key>
```

---

Références :

- [[Automatisation]]