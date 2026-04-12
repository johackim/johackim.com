---
datePublished: 2026-03-25T00:00
dateUpdated: 2026-03-25T00:00
permalink: greywall
publish: true
rss: true
---

Pour éviter que vos fichiers sensibles soient accessibles par les agents IA, il existe [Greywall](https://greywall.io/).

Greywall est une sorte de pare-feu pour agents IA qui vous permet de contrôler et surveiller les accès au système de fichiers et au réseau lorsque vous utilisez des outils comme [Claude Code](https://claude.com/fr-fr/product/claude-code) ou [Gemini CLI](https://github.com/google-gemini/gemini-cli).

Il agit comme un proxy entre l'agent et votre machine, vous offrant une visibilité complète sur ses actions.

Il est actuellement disponible uniquement sur Linux et MacOS.

## Installation

[Téléchargez Greywall](https://github.com/GreyhavenHQ/greywall/releases/latest) et exécutez les commandes suivantes :

```bash
tar xvf greywall_0.2.8_Linux_x86_64.tar.gz
sudo mv greywall /usr/local/bin/
```

N'oubliez pas d'installer `socat` :

```bash
sudo pacman -S socat
# Ou
sudo apt install -y socat
```

## Utilisation

```bash
greywall setup
systemctl --user start greyproxy.service
```

Rendez-vous sur http://localhost:43080/dashboard

```bash
greywall -- claude
# Ou
greywall -- gemini
```

Vous pouvez éditer la configuration dans `~/.config/greywall/greywall.json` :

```json
{
  "filesystem": {
    "denyRead": [
      "PRIVATE.md"
    ]
  }
}
```

Vous pouvez également créer un fichier `.greywall.json` dans le dossier en cours et le charger avec la commande suivante :

```bash
greywall --settings .greywall.json -- claude
```

## Debug

Pour débugger, utilisez le paramètre `--debug` :

```bash
greywall --debug
```

## Stop

```bash
systemctl --user stop greyproxy.service
```

Je l'utilise personnellement pour utiliser des agents IA sur [[Obsidian]] sans leur donner accès à mes notes privées.

Et pour encore plus de [[Vie privée]], vous pouvez utiliser des modèles IA en local (ex: Qwen, GLM, Kimi) directement sur votre ordinateur avec [[Ollama]].

> [!ATTENTION]
> Si vous avez une règle deny (ex: `20*.md`), que vous effectuez la commande `greywall` et qu'un nouveau fichier est créé entre temps, le fichier pourra être lu.

---

Références :

- https://github.com/GreyhavenHQ/greywall/