---
title: Minecraft
permalink: minecraft
datePublished: 2021-05-04T08:50
dateUpdated: 2024-12-13T02:31:00
publish: true
rss: true
---

## Installer un serveur Minecraft sur Linux avec Docker

Commencez par installer [Docker](https://docker.com) avec la commande suivante :

```bash
apt update && apt install -yq docker.io
```

Puis lancez un conteneur Docker Minecraft avec la commande suivante :

```bash
docker run -d -e EULA=true -e ONLINE_MODE=true -e MEMORY=4G -p 25565:25565 -v ~/minecraft:/data --name minecraft -v /etc/localtime:/etc/localtime:ro itzg/minecraft-server
```

Vous pouvez à présent accéder à votre serveur Minecraft en renseignant l'adresse IP de votre serveur suivi du port (ex: `127.0.0.1:25565`).

PS : N'oubliez pas de configurer votre pare-feu pour permettre l'accès au port `25565` si besoin.

## Exécuter des commandes Minecraft

Pour exécuter une commande Minecraft (ex : `/give <player> <item>`), appuyez sur la touche `t` ou `/` lorsque vous êtes dans une session de jeu Minecraft.

Il existe [plein de commandes](https://minecraft.gamepedia.com/Commands#List_and_summary_of_commands) dont :

- `/give <player> <item>` - Donner un item à un joueur
- `/gamemode <mode>` - Changer le mode de jeu
- `/tp <player>` - Se téléporter vers un joueur
- `/list` - Liste des joueurs connectés

Sur un serveur Minecraft, si vous n'êtes pas administrateur, vous devez exécuter la commande suivante côté serveur :

```bash
docker exec -it minecraft rcon-cli
/op <player> # Mettre un joueur en admin
```

## Installer Forge

Pour installer Forge, rendez-vous [sur le site officiel](https://files.minecraftforge.net/) et téléchargez la dernière version (ex: 1.20.6).

Une fois le fichier téléchargé, exécutez le en cliquant dessus ou via la ligne de commande suivante :

```bash
java -jar forge-1.20.6-50.1.23-installer.jar
```

Forge sera à présent disponible dans le launcher officiel de minecraft.

## Installer un mod Minecraft

Pour installer un mod Minecraft :

- Trouver un mod sur [le site CurseForge](https://curseforge.com/minecraft/search?class=mc-mods)
- Télécharger un mod (ex: [MrCrayfish’s Furniture](https://curseforge.com/minecraft/mc-mods/mrcrayfish-furniture-mod)
- Placer votre mod (ex: `cfm-forge-1.20.1-7.0.0-pre36.jar`) dans le dossier correspondant à votre système :
  - `~/.minecraft/mods/` sur Linux
  - `C:\Users\<NomUtilisateur>\AppData\Roaming\.minecraft` sur Windows
- Démarrez Minecraft avec la version Forge (ex: `1.20.1-forge-47.2.17`) depuis le launcher de Minecraft

## Installer un mod Minecraft (côté serveur)

Si vous avez un serveur Minecraft :

- Trouver un mod sur [le site CurseForge](https://curseforge.com/minecraft/search?class=mc-mods)
- Télécharger un mod (ex: [MrCrayfish’s Furniture](https://curseforge.com/minecraft/mc-mods/mrcrayfish-furniture-mod)
- Placer le mod téléchargé (ex: `cfm-forge-1.20.1-7.0.0-pre36.jar`) dans le dossier `/data/mods`
- Télécharger et exécuter le fichier `forge-1.20.1-47.2.17-installer.jar` et placez le fichier dans le dossier `/data`
- Démarrez Minecraft avec la version Forge (ex: `1.20.1-forge-47.2.17`) depuis le launcher de Minecraft
- Démarrez votre serveur Minecraft avec les paramètres `-e VERSION=1.20.1 -e TYPE=FORGE -e FORGE_INSTALLER=forge-1.20.1-47.2.17-installer.jar`

## Installer un shader

Pour installer un shader, installer [Iris](https://www.irisshaders.dev/) ou [OptiFine](https://optifine.net/home) selon le shader que vous souhaitez.

Par exemple, pour le shader [Shrimple](https://modrinth.com/shader/shrimple) (qui est compatible avec Iris) :

1. Installez iris

```bash
java -jar Iris-Installer-3.2.1.jar
```

1. Puis téléchargez le shader shrimple au format zip et placez-le dans le dossier `~/.minecraft/shaderpacks/`.

2. Démarrez Minecraft avec iris depuis le launcher officiel.

## Installer une map

Pour installer une map (ex: https://www.planetminecraft.com/project/ender-dragon-one-cycle-practice/).

Télécharger le fichier zip (ex: `Ender Dragon Bed Practice.zip`) et dézipper le dans le dossier `~/.minecraft/saves`.

## Faire une sauvegarde de son monde Minecraft

Pour faire une sauvegarde, c'est très simple, il suffit de copier-coller le dossier `~/minecraft` là où vous le souhaitez (ex : Nextcloud, NAS, etc...) 😀

N'oubliez pas d'exécuter la commande `/save-all flush` pour que la sauvegarde s'effectue correctement avant de copier le dossier.

## Sécuriser un serveur Minecraft

Pour restreindre l'accès au serveur à une liste de joueurs autorisés, vous pouvez activer la whitelist avec les commandes suivantes :

```txt
/whitelist on
/whitelist add <player>
```

> [!ATTENTION]
> Des petits malin peuvent quand même trouver votre pseudo et rentrez sur votre serveur en se faisant passer par vous.

Le mieux reste de restreindre l'accès au serveur à une liste d'adresses IP autorisées avec un pare-feu (ex: [[iptables]]).

---

Références :

- [Installer Minecraft](https://minecraft.net/fr-fr/download)
- [Liste des commandes Minecraft](https://minecraft.fandom.com/wiki/Commands)
- [Site de cartes Minecraft (minecraftmaps.com)](https://minecraftmaps.com/)
- [Site de cartes Minecraft (planetminecraft.com)](https://planetminecraft.com/)
- https://fmhy.net/gaming-tools#minecraft-tools
<!-- [Hidden trap](https://youtube.com/watch?v=bz-tUrWfaI4) -->