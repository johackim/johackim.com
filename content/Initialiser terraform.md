---
datePublished: 2021-05-30T19:50
dateUpdated: 2021-05-30T19:50
permalink: initialiser-terraform
publish: true
rss: true
note: 50
---

Pour initialiser terraform, créez un fichier `main.tf`, exemple :

```json
// main.tf
terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}

resource "docker_image" "image_id" {
  name = "ghost:latest"
}
```

Cet exemple demande l'utilisation de Docker sur notre machine hôte, n'oubliez pas d'[[Installer Docker|installer Docker]].

Puis exécutez la commande suivante :

```bash
terraform init
```

---

Références :

- [[Terraform]]