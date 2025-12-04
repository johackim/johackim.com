---
datePublished: 2021-10-06T16:50
dateUpdated: 2025-06-15T16:50:00
permalink: libreelec
description: Guide d'installation de LibreELEC sur un Raspberry PI
publish: true
rss: true
note: 54
---

Voici comment installer LibreELEC sur un Raspberry PI.

Commencez par [Télécharger LibreELEC](https://libreelec.tv/downloads/raspberry/).

Puis utilisez [[Etcher]] pour le graver sur votre carte SD.

Ou exécutez la commande suivante :

```bash
7z x LibreELEC-RPi2.arm-12.0.2.img.gz
sudo dd if=LibreELEC-RPi2.arm-12.0.2.img of=/dev/sdx status=progress conv=sync
```

Vous pouvez ensuite vous connectez en ssh via la commande :

```bash
ssh root@<ip>
```

---

Références :

- [[Linux]]