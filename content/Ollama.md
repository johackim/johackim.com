---
title: Ollama
permalink: ollama
description: Ollama est un outil pour utiliser des modèles d'IA (Llama 2, Mistral, etc...) localement.
datePublished: 2024-02-19T10:00:00
dateUpdated: 2024-10-16T10:00:00
publish: true
rss: true
---

[Ollama](https://github.com/ollama/ollama) est un outil qui permet d'utiliser des modèles d'IA (Llama 2, Mistral, Gemma, etc...) localement sur son propre ordinateur ou serveur.

C'est ultra simple à utiliser, et ça permet de tester des modèles d'IA sans être un expert en IA.

Il supporte un grand nombre de [modèles d'IA](https://ollama.ai/library) donc certains en version non censurés.

Rien de mieux pour tester des modèles d'IA non propriétaires !

## Installation

Pour l'installer sur Linux :

```bash
curl -fsSL https://ollama.com/install.sh | sh
# Ou
curl -fsSL https://ollama.com/install.sh | OLLAMA_VERSION=0.1.32 sh # Pour une version spécifique
```

Pour l'installer sur Arch Linux :

```bash
sudo pacman -S ollama
```

Pour démarrer le service ollama :

```bash
sudo systemctl start ollama
```

## Utilisation

Pour démarrer un modèle d'IA, il suffit de lancer la commande `ollama run` suivi du nom du modèle.

Par exemple, pour démarrer [Mistral](https://mistral.ai) :

```bash
ollama run mistral
```

Une fois le modèle démarré, vous pouvez directement interagir avec lui depuis votre terminal.

Pour supprimer le modèle :

```bash
ollama rm mistral
```

Il existe même une commande pour démarrer Ollama en mode serveur avec [Docker](https://hub.docker.com/r/ollama/ollama) :

```bash
docker run -d --name ollama --restart=always -v ~/.ollama:/root/.ollama -p 11434:11434 ollama/ollama
```

Vous pouvez interagir avec Ollama via le port `11434` avec des requêtes HTTP :

```bash
curl -X POST http://localhost:11434/api/generate -d '{
  "model": "mistral",
  "prompt":"Here is a story about llamas eating grass"
}'
```

## Utilisation des modèles HuggingFace au format .gguf

Et si vous voulez utiliser [un modèle au format .gguf](https://huggingface.co/models?search=gguf), vous pouvez le faire :

```bash
ollama run hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF
```

## Utilisation avec un client web

Il est aussi possible d'utiliser un client web comme [Open WebUI](https://github.com/open-webui/open-webui), [Chatbot UI](https://github.com/mckaywrigley/chatbot-ui) ou [Lobe Chat](https://github.com/lobehub/lobe-chat)

![Open WebUI](https://i.imgur.com/dprcPpW.png)

Cela donne un rendu très équivalent à ChatGPT.

Nos données restent privées et l'on peut discuter avec un modèle d'IA sans être censuré.

## Désinstallation

Pour désintaller Ollama :

```bash
sudo systemctl disable --now ollama
sudo rm -rf /var/lib/ollama
sudo pacman -Rsn ollama
```

## Serverless GPU

> [!NOTE]
> En cours de création

Comment utiliser `ollama run <model>` (ou open-webui) avec un serveur GPU distant uniquement lorsque une requête est envoyé ?

```bash
OLLAMA_HOST=https://my.proxy.com ollama run deepseek-r1
# Use a proxy
# Use runpod
# "Ollama is running" on http://<runpod_ip>:11434/
# https://github.com/marknefedov/ollama-openrouter-proxy
```

---

Références :

- https://www.geeek.org/mistral-ollama/
- https://www.geeek.org/tutoriel-installation-llama-2-et-code-llama/
- https://danielmiessler.com/p/how-to-use-hugging-face-models-with-ollama