---
datePublished: 2021-07-11T09:50
dateUpdated: 2021-07-11T09:50
permalink: creer-un-theme-obsidian
title: Comment créer un thème Obsidian ?
publish: true
rss: true
note: 71
---

Voici un tutoriel pour créer un thème [[Obsidian]].

## Créer un fichier.css

Créer un fichier CSS `nomdutheme.css` dans le dossier `.obsidian/themes` de votre Vault Obsidian.

Ce fichier contient simplement les couleurs (en valeur hexadécimale) des éléments de votre thème (texte, blocs de code, fonds, etc...).

Vous pouvez vous inspirer de mon thème qui va overrider le thème `light` et `dark` par défaut d'Obsidian :

```css
/* vault/.obsidian/themes/darkyan.css */

.theme-light,
.theme-dark {
    --background-primary:         #111827;
    --background-primary-alt:     #111827;
    --background-secondary:       #1F2937;
    --background-secondary-alt:   #1F2937;
    --text-normal:                #D1D5DB;
    --text-faint:                 #D1D5DB;
    --text-title-h1:              #D1D5DB;
    --text-title-h2:              #D1D5DB;
    --text-title-h3:              #D1D5DB;
    --text-title-h4:              #D1D5DB;
    --text-title-h5:              #D1D5DB;
    --text-title-h6:              #D1D5DB;
    --text-highlight-bg:          #374151;
    --text-link:                  #D1D5DB;
    --text-a-hover:               #D1D5DB;
    --inline-code:                #D1D5DB;
    --code-block:                 #D1D5DB;
    --text-a:                     #D1D5DB;
    --interactive-accent:         #00AAAD;
    --text-accent:                #00AAAD;
    --text-accent-hover:          #00AAAD;
    --text-on-accent:             #D1D5DB;
    --interactive-accent-rgb:     #D1D5DB;
    --interactive-accent-hover:   #00AAAD;
    --vim-cursor:                 #D1D5DB;
    --pre-code:                   #000000;
    --interactive-before:         #374151;
    --background-modifier-border: #374151;
    --text-selection:             #374151;
    --text-faint:                 #4B5563;
}
```

## Activer le thème

Une fois le fichier créé, vous pouvez activer votre thème depuis les paramètres dans le menu suivant :

Settings -> Appearance -> Themes -> Theme -> NomDeVotreTheme

## Publier un thème

J'ai récemment créé un thème, vous pouvez l'utiliser en vous rendant sur le dépôt Github [johackim/obsidian-darkyan](https://github.com/johackim/obsidian-darkyan/).

Pour publier son thème dans les thèmes de la communauté d'Obsidian, créez une pull request sur le dépôt [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases/pull/356).

Une fois la pull request accepté, il apparaitra dans la liste des thèmes d'Obsidian dans Settings -> Appearance -> Themes -> Community themes.