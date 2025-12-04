---
datePublished: 2021-06-07T20:36
dateUpdated: 2021-06-07T20:36
permalink: gerer-les-workspaces-avec-terraform
publish: true
rss: true
note: 54
---

Terraform donne la possibilité de gérer facilement des espaces de travail :

## Créer un workspace

```bash
terraform workspace new <name>
```

Vous pouvez par exemple créer 2 espaces de travail `dev` et `prod` pour effectuer vos tests sur l'infructure de `dev` avant d'appliquer des changement sur l'infrastructure de `prod` :

```bash
terraform workspace new dev
terraform workspace new prod
```

## Sélectionner un workspace

```bash
terraform workspace select <name>
```

## Supprimer un workspace

```bash
terraform workspace delete <name>
```

## Lister les workspaces

```bash
terraform workspace list
```