---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: tester-la-vitesse-d'ecriture-d'un-disque-dur-sur-linux
publish: true
rss: true
---

Pour tester la vitesse d'écriture d'un disque dur sur [[Linux]], il existe une commande installé nativement sur la plus part des distributions [[Linux]] qui s'appelle `dd`.

```bash
$ dd if=/dev/zero of=1g.bin bs=1G count=1
# 1+0 records in
# 1+0 records out
# 1073741824 bytes (1.1 GB, 1.0 GiB) copied, 3.38203 s, 317 MB/s
```

Dans ce cas présent, la vitesse d'écriture du disque dur est de 317 MB/s.

---

Références :

- [[Linux]]
- [[IOPS]]