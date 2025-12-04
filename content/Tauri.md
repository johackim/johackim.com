---
title: Tauri
permalink: tauri
description: Tauri est un framework open-source basé sur Rust pour construire des applications multiplateformes.
datePublished: 2024-04-15T10:00:00
dateUpdated: 2024-04-15T10:00:00
publish: true
rss: true
note: 69
---

[Tauri](https://github.com/tauri-apps/tauri) est un framework open-source basé sur Rust pour construire des applications multiplateformes.

Vous pouvez créer des applications pour Windows, macOS, Linux, iOS et Android avec une seule base de code.

## Installation

Pour installer un nouveau projet Tauri, il suffit de lancer la commande suivante :

```bash
npx create tauri-app --beta
```

## Utilisation

Une fois installé, vous pouvez lancer votre application avec la commande suivante :

```bash
npx tauri dev
```

## Compilation

Et pour compiler l'exécutable de votre application, il s'agit de la commande suivante :

```bash
npx tauri build
```

Si vous rencontrez une erreur, vous pouvez ajouter le paramètre `npx tauri build --verbose` pour voir plus de détails.

Et si comme moi, vous rencontrez une erreur `ERROR: Strip call failed` lors de la compilation, vous pouvez ajouter la variable d'environnement `NO_STRIP=true npx tauri build`.

---

Références :

- [Tauri](https://beta.tauri.app/blog/tauri-2-0-0-beta/)
- [Fireship - Tauri in 100 Seconds](https://youtu.be/-X8evddpu7M)