---
title: Changer la version de python facilement avec pyenv
permalink: changer-la-version-de-python-facilement-avec-pyenv
datePublished: 2021-09-27T22:29
dateUpdated: 2021-09-27T22:29
publish: true
rss: true
note: 67
---

Pour changer de version de Python facilement, de la même manière que nvm pour NodeJS, il existe l'outil [pyenv](https://github.com/pyenv/pyenv).

## Installation de pyenv

Pour l'installer, exécutez les commandes suivantes en provenance de [ce dépôt Github](https://github.com/pyenv/pyenv-installer) :

```bash
curl https://pyenv.run | bash
echo 'export PATH="$PATH:$HOME/.pyenv/bin"' >> ~/.bashrc
echo 'eval "$(pyenv init --path)"' >> ~/.bashrc
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
source ~/.bashrc
```

## Utilisation de pyenv

Pour installer une nouvelle version de Python :

```bash
pyenv install -v 3.7.0
```

Pour switcher sur cette nouvelle version :

```bash
pyenv global 3.7.0
```

```bash
python -V
# Python 3.7.0
```

Pour revenir sur la version python de notre système :

```bash
pyenv global system
```

## (Facultatif) Fix temporaire

J'ai un souci avec `pip` qui me renvoie une erreur : `~/.pyenv/pyenv.d/exec/pip-rehash/pip: line 20: 38799 Segmentation fault (core dumped) "$PYENV_COMMAND_PATH" "$@"`.

Pour régler le problème je commente une ligne du fichier `~/.pyenv/versions/3.7.0/bin/pip3.7` :

```python
# sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
```

---

Références :

- [[Python]]