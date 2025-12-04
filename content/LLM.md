---
aliases:
  - Large Language Model
title: LLM
permalink: llm
description: Un LLM (Large Language Model) est un modèle de langage de grande taille.
datePublished: 2024-04-29T10:00:00
dateUpdated: 2024-05-15T10:00:00
publish: true
---

Un LLM (Large Language Model) est un modèle de langage de grande taille.

Il est capable de générer du texte et d'effectuer des tâches de traitement du langage naturel telles que :

- La génération de texte
- La traduction de langues
- La classification de texte
- La réponse à des questions
- Etc...

Le plus connu des LLM propriètaires est GPT-4, développé par OpenAI.

Il existe aussi des LLM open-source comme Mistral de Mistral.ai ou LLama3 de Meta.

Chaque modèle a une taille différente (7B, 13B, 34B, 70B, 110B, 400B), qui correspond au nombre de milliards de paramètres qu'il possède.

Pour vulgariser, le **nombre de paramètres** est l'équivalent du QI d'un modèle.

Plus le modèle est grand et plus cela demande de ressources GPU/RAM pour l'utiliser.

Aussi, chaque LLM a une **fenêtre de contexte** ([[Context window]]) qui correspond au nombre de tokens que peut prendre le modèle en entrée.

Par exemple :

- LLama3 -> 8,000 tokens
- Mixtral 8x22B's -> 64,000 tokens
- GPT-4 Turbo -> 128,000 tokens
- Command-R+ -> 128,000 tokens
- Claude 3 -> 200,000 tokens
- Gemini 1.5 Pro -> 2,000,000 tokens

Grâce à une fenêtre de contexte plus grande, le modèle peut par exemple prendre un livre entier en entrée et générer un texte qui a du sens.

---

Références :

- https://github.com/rasbt/LLMs-from-scratch
- https://blog.miguelgrinberg.com/post/how-llms-work-explained-without-math