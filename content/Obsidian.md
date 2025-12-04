---
datePublished: 2021-05-11T14:20
dateUpdated: 2022-10-04T09:22
permalink: obsidian
title: Obsidian
publish: true
rss: true
note: 91
---

[Obsidian](https://obsidian.md/) est une application de prise de notes comme [Evernote](https://evernote.com/), [Notion](https://notion.so/) et [Bear](https://bear.app/), mais se distingue en introduisant une nouvelle façon d'organiser et de prendre vos notes.

- Les **Backlinks** (liens bidirectionnels) - permettant de relier les notes entre elles.
- Un **Graph Viewer** - pour découvrir et associer des notes et des topics.

Et contrairement à [Roam Research](https://roamresearch.com/), Obsidian est **gratuit** et garde les **données en local sur son ordinateur**.

Ainsi, vous pouvez sauvegarder/synchroniser toutes vos données sur votre NAS ou une solution cloud comme Nextcloud.

Il est disponible sur Mac, Windows, [[Linux]], Android et iOS.

## Syntaxe Markdown

Obsidian utilise la syntaxe Markdown par défaut :

- `[Link Text](URL)` : Créer un lien avec URL
- `![Alt Text](URL)` : Créer une image
- `- Bullet List` : Créer une liste
- `1. Number List` : Créer une liste numérique
- `**bold**` : Créer un texte en gras
- `*italic*` : Créer un texte en italique
- `**souligner**` : Créer un texte souligné
- `~~Strikethrough~~` : Créer un texte barré
- `> quote` : Créer une citation
- `# Heading 1` : Créer un titre de niveau 1
- `## Heading 2` : Créer un titre de niveau 2
- `### Heading 3` : Créer un titre de niveau 3
- `[ref1]` et `[ref1]: <url>` : Créer une référence
- `[Link Text][ref1]` et `[ref1]: <url>` : Créer une référence avec un text personnalisé

## Syntaxe d'Obsidian

Mais il a quelques spécificités de syntaxes supplémentaires :

- `[[Linking Note]]` : Créer un lien vers une autre note
- `[[Linking Note|Link Name]]` : Créer un lien avec un nom personnalisé
- `[[Linking Note#heading]]` : Créer un lien vers un titre d'une autre note
- `![[Linking Note^]]` : Intégrer un bloc d'une autre note
- `![[Filename]]` : Intégrer une autre note
- `![[Image.filetype|250]]` : Insérer une image embed de 250px de largeur
- `![|250](https://site.xyz/image.png)` : Insérer une image de 250px de largeur
- `![](https://youtube.com/watch?v=NnTvZWp5Q7o)` : Intégrer une vidéo YouTube
- `![](https://twitter.com/obsdmd/status/1580548874246443010)` : Intégrer un Tweet
- `#tag` : Créer un tag
- `#nested/tag` : Créer un sous-tag
- `[^Ref]` et `[^Ref]: Footnote text.` : Créer une note de bas de page
- `^[Footnote text]` : Créer une note de bas de page en une ligne
- `==highlight==` : Créer un texte surligné
- `aliases: [Alias1, Alias2]` : Créer un alias (à ajouter dans le frontmatter)
- `- [ ] Task list` : Créer une tâche
- `- [x] Task list` : Cocher une tâche
- `> [!NOTE]` : Créer un callout^[https://help.obsidian.md/How+to/Use+callouts]

## Raccourcis clavier

- `CTRL+E` : Basculer entre le mode édition et visualisation.
- `CTRL+O` : Changer de fichier rapidement
- `CTRL+MAJ+F` : Activer le mode recherche
- `CTRL+P` : Exécuter une commande
- `CTRL+G` : Afficher le Graph viewer
- `CTRL+,` : Afficher les paramètres d'Obsidian

## Fonctionnalités avancées

- **Templates** : Vous pouvez créer des templates réutilisables.
- **Daily notes** : Obsidian permet de créer rapidement des notes journalières à partir d'un template.
- **Workspaces** : Vous pouvez créer des espaces de travail avec des configurations différentes.
- **Publish** : Vous pouvez publier vos notes publiquement sur un site que [obsidian.md](https://obsidian.md/publish) héberge pour vous.
- **Mermaid** : Obsidian est compatible avec [Mermaid](https://github.com/mermaid-js/mermaid), ce qui vous permet de créer des diagrammes dans vos notes.

## Plugins

Obsidian offre la possibilité d'étendre ses fonctionnalités avec des plugins :

| Plugin                                                                                                                                                       | Description                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| [Mindmap](https://github.com/lynchjames/obsidian-mind-map)                                                                                                   | Créer des mindmaps                              |
| [Kanban](https://github.com/mgmeyers/obsidian-kanban)                                                                                                        | Créer des boards kanban                         |
| [Avanced-tables](https://github.com/tgrosinger/advanced-tables-obsidian)                                                                                     | Simplifier l'édition des tableaux               |
| [Note-refactor](https://github.com/lynchjames/note-refactor-obsidian)                                                                                        | Séparer une note en plusieurs notes             |
| [Tracker](https://github.com/pyrochlore/obsidian-tracker)                                                                                                    | Collecter des données à afficher des graphiques |
| [Flashcards](https://github.com/st3v3nmw/obsidian-spaced-repetition)                                                                                         | Créer des Flashcards                            |
| [Andy Matuschak Mode](https://github.com/deathau/sliding-panes-obsidian)                                                                                     | Activer le mode d'affichage Andy Matuschak      |
| [Obsidian Charts](https://github.com/phibr0/obsidian-charts)                                                                                                 | Créer des graphiques                            |
| [Dataview](https://github.com/blacksmithgu/obsidian-dataview)                                                                                                | Créer des tableaux basées sur ses notes         |
| [Tasks](https://github.com/schemar/obsidian-tasks)                                                                                                           | Gérer ses tâches                                |
| [Toc](https://github.com/hipstersmoothie/obsidian-plugin-toc)                                                                                                | Créer automatiquement un sommaire               |
| [Tag-wrangler](https://github.com/pjeby/tag-wrangler)                                                                                                        | Améliorer la gestion des tags                   |
| [Excalidraw](https://github.com/zsviczian/obsidian-excalidraw-plugin)                                                                                        | Dessiner sur Obsidian                           |
| [Heatmap calendar](https://github.com/Richardsl/heatmap-calendar-obsidian)                                                                                   | Afficher un calendrier comme Github Activity    |
| [Hover Editor](https://github.com/nothingislost/obsidian-hover-editor)                                                                                       | Améliorer le mode prévisualisation des liens    |
| [Alternative Checkboxes](https://publish.obsidian.md/hub/02+-+Community+Expansions/02.05+All+Community+Expansions/CSS+Snippets/Alternate+Checkboxes+(SlRvb)) | Design pour améliorer les checkboxes            |
| [Obsidian linter](https://github.com/platers/obsidian-linter/)                                                                                               | Linter markdown                                 |
| [Surfing](https://github.com/Quorafind/Obsidian-Surfing)                                                                                                     | Navigateur web intégré à Obsidian               |

## Sécurité

D'un point de vue sécurité, voilà ce qui est affiché sur la page d'accueil d'Obsidian :

> [!QUOTE]
> À notre époque où les services de cloud computing peuvent fermer, être rachetés ou changer de politique de confidentialité à tout moment, la dernière chose que vous voulez est un format propriétaire et un verrouillage des données.
>
> Avec Obsidian, vos données se trouvent dans un dossier local. Ne laissez plus jamais le travail de votre vie pris en otage dans le cloud.
>
> Le format Markdown en texte brut vous donne également une interopérabilité inégalée pour utiliser n'importe quel type de synchronisation, de chiffrage ou de traitement de données qui fonctionne avec des fichiers en texte brut.

Et lorsque vous activez [la fonctionnalité Sync](https://obsidian.md/sync), les données sont chiffrées de bout en bout par défaut.

[Plus d'informations](https://help.obsidian.md/Obsidian+Sync/Security+and+privacy)

---

Références :

- [Linking Your Thinking - Obsidian for Beginners](https://youtube.com/watch?v=QgbLb6QCK88&list=PL3NaIVgSlAVLHty1-NuvPa9V0b0UwbzBd)
- [Keep Productive - Obsidian Made Simple](https://keepproductive.com/obsidian-made-simple)
- [Prendre de bonnes notes dans OBSIDIAN - ZETTELKASTEN dans obsidian](https://youtu.be/Zawx-N3-iko)
- [Mike Schmitz - The Sweet Setup](https://thesweetsetup.com/obsidian/)
- [Nicole van der Hoeven - Obsidian for Everyone](https://courses.nicolevanderhoeven.com/o4e)
- [[Créer un plugin Obsidian]]