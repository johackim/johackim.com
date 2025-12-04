---
datePublished: 2021-09-16T22:10
dateUpdated: 2021-09-16T22:10
permalink: deployer-automatiquement-un-depot-sur-github-pages
aliases:
  - Déployer automatiquement un dépot sur Github Pages
publish: true
rss: true
---

Pour déployer automatiquement son code sur Github Pages, il existe les GitHub Actions.

Créez un fichier Yaml dans le dossier `.github/workflows/` à la racine de votre dépôt git (ex: `.github/workflows/deploy.yml`).

```yaml
name: Deploy

on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install packages
        run: npm install

      - name: Build
        run: npm run build

      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

~~[Générer un token](https://github.com/settings/tokens/new) avec à un accès au scope `repo` puis ajoutez le en tant qu'Action Secret `GH_TOKEN` dans les settings de votre dépot Github (Settings -> Secrets -> New repository secret).~~ (Utiliser la variable GITHUB_TOKEN autogénéré par Github à la place).

Sans oubliez de modifier les paramètres du dépôt : `Settings -> Actions -> General -> Workflow permissions -> Read and write permissions -> Save`.

Déployez votre code, et il sera automatiquement déployé sur une branche `gh-pages` à chaque push sur la branche master.

Enfin, activez Github pages dans les Settings -> Pages.

Pour ajouter un nom de domaine root, changez la zone de type A de votre nom de domaine avec l'une des valeurs suivantes :

```txt
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

> [!NOTE]
> Pour connaitre la liste des adresse IPs, exécutez la commande `dig A your_github_username.github.io`.

Ou une zone de type CNAME avec `your_github_username.github.io` si vous utilisez un sous-domaine.

> [!IMPORTANT]
> N'oubliez pas de créer un fichier `CNAME` avec votre nom de domaine ou sous-domaine à l'intérieur du fichier pour que Github Page garde bien le nom de domaine lors des prochains déploiements.

---

Références :

- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site