---
title: Comment créer un chatbot open-source avec Rasa ?
permalink: creer-un-chatbot-avec-rasa
aliases: [Comment créer un chatbot avec Rasa ?]
datePublished: 2021-07-25T19:49
dateUpdated: 2021-07-25T19:49
publish: true
rss: true
note: 76
---

> [!INFO] Contenu archivé
> Cet article n'est plus maintenu.

## Initialiser un bot

Pour initialiser un projet avec [Rasa](https://github.com/RasaHQ/rasa), exécutez la commande [Docker](https://docker.com) suivante :

```bash
docker run -it -u 1000 -v ${PWD}:/app rasa/rasa:2.8.0-full init --no-prompt
```

## Essayer de parler avec un bot

Pour essayer un bot, exécutez la commande suivante :

```bash
docker run -it -u 1000 -v ${PWD}:/app rasa/rasa:2.8.0-full shell
```

Vous pouvez à présent parler avec votre bot, essayez de d'écrire un texte (ex: "Hello !") et il vous répondra.

Si vous voulez redémarrer ou stopper le bot, voici les commandes à executer :

```bash
/restart
/stop
```

## Entrainer votre bot

Il existe une commande pour entrainer un bot :

```bash
docker run -it -u 1000 -v ${PWD}:/app rasa/rasa:2.8.0-full train
```

## Tester le bot

Dans un projet Rasa, il existe un dossier `test`, avec des fichier yaml (ex: `test_stories.yml`).

Ces fichiers, permettent de tester notre bot de manière automatique pour vérifier si il répond correctement selon la configuration qu'on lui a renseigné.

Exéctuez la commande suivante pour tester votre bot :

```bash
docker run -it -u 1000 -v ${PWD}:/app rasa/rasa:2.8.0-full test
```

Si jamais un test échoue, vous pouvez avoir plus de détails via le fichier `results/failed_test_stories.yml`.

## Démarrer votre bot

Pour démarrer votre bot :

```bash
docker run -u 1000 -p 5005:5005 -v ${PWD}:/app rasa/rasa:2.8.0-full run
```

## Configurer le bot

Les 3 fichiers les plus importants pour configurer un bot sont les suivants :

- `data/nlu.yml`

Ce fichier contient la liste de tous les languages (NLU) que le bot analysera pour selectionner une action correspondante à chaque message qu'il recevra.

- `data/stories.yml`

Ce fichier contient tous les différents chemins qu'un utilisateur peut emprunter pour parler au bot.

- `domain.yml`

Ce fichier contient toutes les réponses que le bot peut envoyer à un utilisateur.

- `actions/actions.py`

## Configurer le bot pour qu'il dise "bonjour"

Pour que notre bot dise bonjour il faut configurer 3 fichiers :

```yaml
# data/nlu.yml

nlu:
  - intent: hello
    examples: |
      - bonjour
      - salut
      - hello
      - hey
      - yo
      - coucou
      - comment tu vas ?
      - Salutations ! Je suis Buzz L'éclair et je viens en paix !
```

```yaml
# data/stories.yml

stories:
  - story: hello
    steps:
      - intent: hello
      - action: utter_hello
```

```yaml
# domain.yml

intents:
  - hello

responses:
  utter_hello:
    - text: "Bonjour, que puis-je pour vous ?"
```

## Configurer le bot pour qu'il vérifie la disponibilité d'un site internet

```yaml
# endpoints.yml

action_endpoint:
  url: http://localhost:5055/webhook
```

```yaml
# data/nlu.yml

version: "2.0"

nlu:
  - intent: check_website
    examples: |
      - j'aimerai vérifier la disponibilité de mon site
```

```yaml
# data/rules.yml

version: "2.0"

rules:
  - rule: activate check_website form
    steps:
      - intent: check_website
      - action: check_website_form
      - active_loop: check_website_form

  - rule: submit check_website_form
    condition:
      - active_loop: check_website_form
    steps:
      - action: check_website_form
      - active_loop: null
      - action: action_hello_world
      - action: utter_website_tested
```

```yaml
# domain.yml

responses:
  utter_ask_website:
    - text: "Pouvez-vous me rappeler le nom de domaine de votre application ? (ex: mondomaine.fr)"

forms:
  domain_form:
    required_slots:
      domain:
        - type: from_text

actions:
  - action_check_domain
```

```python
# actions/actions.py

import requests
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

def check_website(domain):
    try:
        url = "https://%s" % domain
        r = requests.get(url)

        if r.status_code == 200:
            return True

        return False
    except Exception as e:
        return False

class ActionCheckDomain(Action):

   def name(self) -> Text:
       return "action_check_domain"

   def run(self, dispatcher: CollectingDispatcher,
           tracker: Tracker,
           domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

       if check_website(tracker.get_slot("domain")):
           dispatcher.utter_message(text="Domain good")
       else:
           dispatcher.utter_message(text="Domain bad")

       return []
```