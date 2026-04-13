---
datePublished: 2021-05-30T19:50
dateUpdated: 2021-05-30T19:50
permalink: regarder-la-meteo-depuis-un-terminal
publish: true
rss: true
---

Pour regarder la météo depuis un terminal, il existe le projet GitHub [wttr.in](https://github.com/chubin/wttr.in) qui permet de consulter la météo de sa ville avec une simple commande curl depuis un terminal Linux, Mac ou Windows.

## Exemple avec la ville de Paris

Exécutez la commande suivante :

```bash
curl http://wttr.in/Paris
```

## Mettre la langue en français

Pour mettre en français, ajoutez le paramètre `?lang=fr` :

```bash
curl http://wttr.in/Paris\?lang\=fr
```

## Supprimer le message de fin

Pour supprimer le message de fin, ajoutez le paramètre `&F` :

```bash
curl http://wttr.in/Paris\?lang\=fr\&F
```

## Ajouter un alias dans votre terminal

Vous pouvez ajouter un alias dans votre fichier `.bashrc` ou `.zshrc` :

```bash
alias meteo="curl http://wttr.in/Paris\?lang\=fr\&F"
```

Comme ça, vous pouvez à tout moment connaitre la météo en tapant la commande `meteo` dans votre terminal 😀.

---

Références :

- [[Linux]]