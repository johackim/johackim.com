---
datePublished: 2021-05-18T21:17
dateUpdated: 2022-10-11T17:50
permalink: spectre
aliases:
  - MasterPassword
  - mpw
publish: true
rss: true
---

[Spectre](https://spectre.app/) (anciennement [MasterPassword](https://masterpasswordapp.com/)) est une **application de mot de passe** [open-source](https://gitlab.com/spectre.app) qui ne stocke aucun mot de passe, il contient un algorithme pour **créer des mots de passe uniques de manière reproductible**.

Personnellement, j'utilise Spectre pour une question **minimaliste**.

Pour avoir un outil simple qui **ne m'oblige pas à stocker, synchroniser ou à retenir mes mots de passes**.

Cela m'évite de fournir ma vie à des gestionnaires de mots de passe propriétaires comme lastpass.com, 1password.com ou dashlane.com.

## Explication

**Vous retenez uniquement un seul mot de passe et l'algorithme se charge du reste.**

Exemple : si vous voulez générer/retrouver le mot de passe de l'un de vos comptes (ex : Twitter), vous devez renseigner 3 informations dans l'application :

1. Votre Identifiant Twitter (ex : johackim)
2. L'URL ou le nom de l'application (ex : x.com)
3. Votre MasterPassword (ex : mym@sterp@ssw0rd)

Et cela vous génère un mot de passe unique basé sur ces 3 informations que vous pouvez utiliser en tant que mot de passe Twitter.

**Aucun mot de passe n'est stocké nulle part**. Cela évite de se faire voler ou de perdre son mot de passe. À condition de **ne jamais oublier son MasterPassword** 🧠.

## Installation

Il existe une version [web](https://spectre.pw/), [Extension](https://addons.mozilla.org/fr/firefox/addon/masterpassword-firefox/), Linux, Mac, Windows, [iOS](https://apps.apple.com/us/app/master-password/id662763204) et [Android](https://web.archive.org/web/20210417211605if_/https%3A%2F%2Fmasterpassword%2Eapp%2Fmasterpassword%2Dandroid%2Eapk).

Pour l'installer la version CLI sur Linux :

```bash
git clone --recursive https://gitlab.com/spectre.app/cli spectre
cd spectre
./build
sudo ./install
```

En attendant la sortie de la version GUI de Spectre, vous pouvez utiliser la version Java de MasterPassword :

```bash
wget https://web.archive.org/web/20210417211605if_/https://masterpassword.app/masterpassword-gui.jar
java -jar masterpassword-gui.jar
```

## Utilisation

Lancer l'application sur votre périphérique préféré et renseigner les 3 informations suivantes :

1. Votre Identifiant (nom d'utilisateur ou e-mail)
2. L'URL ou le nom de l'application (ex : x.com ou twitter)
3. Votre MasterPassword (ex : mym@sterp@ssw0rd)

```bash
spectre -u <username> <domain.com>
```

Puis vous récupérez un mot de passe généré !

Si dans de très rare cas, le mot de passe généré n'accepte pas un des caractères de votre mot de passe, jouez avec les paramètres de spectre pour changer le format du mot de passe :

```bash
spectre -u <username> <domain.com> -c 2 # Regénérer le mot de passe une 2ème fois
spectre -u <username> <domain.com> -t short # Changer le format du mot de passe
```

**Astuce** : Ajoutez l'alias `alias copy='xclip -selection clipboard'` dans votre fichier `.bashrc` ou `.zshrc` pour copier-coller le mot de passe généré directement dans le presse-papier (ex : `spectre -u <username> <domain.com> | copy`).

PS : Sur le même principe, il existe aussi [LessPass](https://github.com/lesspass/lesspass).

## Bonus : Démarrer la version web

Il existe aussi une version web de MasterPassword :

```bash
git clone --depth=1 --recursive https://github.com/Lyndir/MasterPassword
cd MasterPassword
git checkout platform-independent/web/js/
cd MasterPassword/platform-independent/web
docker cp -a . $(docker create --rm nginx):/usr/share/nginx/html/
docker commit nginx johackim/mpw
docker run -it --name mpw -p 80:80 johackim/mpw
# Rendez-vous sur http://localhost
```

---

Références :

- [Hacker News - Master Password](https://news.ycombinator.com/item?id=9788597)