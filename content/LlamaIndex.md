---
title: LlamaIndex
permalink: llamaindex
description: LlamaIndex est un framework open-source pour indexer des données et les rendre accessibles par un LLM.
datePublished: 2024-04-29T10:00:00
dateUpdated: 2024-04-29T10:00:00
publish: true
rss: true
note: 91
---

[LlamaIndex](https://llamaindex.ai/) est un framework open-source pour indexer des données et les rendre accessibles par un [[LLM]].

Cela vous permet de poser des questions à vos fichiers textes (`.txt`, `.md`, `.pdf`, `.epub`, etc...).

Et avec les transcripts audio et vidéo, les flux RSS, etc... vous pouvez indexer et interroger n'importe quel type de données.

Il existe une [version Python](https://github.com/run-llama/llama_index) et une [version JavaScript](https://github.com/run-llama/LlamaIndexTS).

> [!NOTE]
> Bien que LLamaIndex peut utiliser des LLMs open-source (ex: [Llama3](https://github.com/meta-llama/llama)), il fonctionne par défaut avec GPT-3 d'OpenAI. Donc n'oubliez pas que chaque requête à l'API d'OpenAI est facturée 😉

## Installation

Commencez par créer un compte sur [OpenAI](https://platform.openai.com/) pour pouvoir utiliser l'API GPT-3.

Puis exportez [votre clé d'API](https://platform.openai.com/api-keys) :

```bash
export OPENAI_API_KEY="votre-clé-d'API"
```

Pour installer la version de LlamaIndex en JavaScript, exécutez la commande suivante :

```bash
npm i llamaindex
```

Pour la version Python, installez le package `llama_index` avec `pip` :

```bash
pip install llama_index
```

## Utilisation en JavaScript

Créez un fichier `index.mjs` avec le contenu suivant :

```js
// index.mjs
import fs from 'fs';
import { Document, VectorStoreIndex } from 'llamaindex';

const essay = fs.readFileSync('node_modules/llamaindex/examples/abramov.txt', 'utf-8');
const document = new Document({ text: essay });

const index = await VectorStoreIndex.fromDocuments([document]);

const queryEngine = index.asQueryEngine();
const response = await queryEngine.query({
  query: 'What did the author do in college?',
});

console.log(response.toString());
```

Cela permet de lire un fichier texte au format `.txt` et de poser une question sur son contenu :

```bash
node index.mjs
```

Pour faire la même chose avec un fichier au format `.pdf`, il faut utiliser le Data Loader `PDFReader` :

```js
// index.mjs
import { PDFReader, VectorStoreIndex } from 'llamaindex';

const reader = new PDFReader();
const documents = await reader.loadData('book.pdf');

const index = await VectorStoreIndex.fromDocuments(documents);

const queryEngine = index.asQueryEngine();
const response = await queryEngine.query({
  query: 'Give me a summary of this book',
});

console.log(response.toString());
```

## Utilisation en Python

Pour Python, créez un dossier `data` avec des fichiers texte au format `.txt` ou `.pdf` et le fichier `index.py` suivant :

```python
# index.py
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)

query_engine = index.as_query_engine()
response = query_engine.query("Give me a summary of this book")

print(response)
```

Voici un exemple pour charger un autre type de fichier (ex: `.epub`) :

```python
from llama_index.core import VectorStoreIndex
from llama_index.readers.file import EpubReader

documents = EpubReader().load_data("./book.epub")
index = VectorStoreIndex.from_documents(documents)

query_engine = index.as_query_engine()
response = query_engine.query("Give me a summary of the book")

print(response)
```

Pour persister l'index, et éviter d'indexer tous les documents à chaque exécution, vous pouvez séparer le fichier en 2 (`index.py` et `query.py`) et utiliser la méthode `save` :

```python
# index.py
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)
index.storage_context.persist()

# query.py
from llama_index.core import StorageContext, load_index_from_storage

storage_context = StorageContext.from_defaults(persist_dir="./storage")
index = load_index_from_storage(storage_context)

query_engine = index.as_query_engine()
response = query_engine.query("Give me a summary of the book")

print(response)
```

Pour utiliser un autre [[LLM]] que GPT-3, vous pouvez utiliser [[Ollama]] avec l'argument `llm` de la fonction `as_query_engine` :

```python
from llama_index.core import VectorStoreIndex
from llama_index.readers.file import EpubReader
from llama_index.llms.ollama import Ollama

documents = EpubReader().load_data("./book.epub")
index = VectorStoreIndex.from_documents(documents)

llama = Ollama(
    model="llama2",
    request_timeout=40.0,
)

query_engine = index.as_query_engine(llm=llama)
res = query_engine.query("Give me a summary of the book")

print(res)
```

Et pour utiliser un autre *embedding model* que celui d'OpenAI :

```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

embed_model = HuggingFaceEmbedding(model_name="mixedbread-ai/mxbai-embed-large-v1")

documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents, embed_model=embed_model)
index.storage_context.persist()
```

L'avantage avec Python, c'est qu'il existe beaucoup plus de [Data Loaders](https://llamahub.ai/?tab=readers) qu'avec JavaScript pour charger différents types de données :

- `EPUBReader` (pour les fichiers `.epub`)
- `VideoAudioReader` (pour les fichiers `.mp4` et `.mp3`)
- `ImageReader` (pour les fichiers `.png` et `.jpg`)
- `RSSReader` (pour les flux RSS)
- etc...

Pour aller plus loin, voici [la documentation de LlamaIndex](https://docs.llamaindex.ai/en/stable/).

---

Références :

- https://github.com/run-llama/llama_index
- https://huggingface.co/learn/cookbook/rag_llamaindex_librarian
- https://github.com/anthropics/anthropic-cookbook/blob/main/third_party/LlamaIndex/Basic_RAG_With_LlamaIndex.ipynb