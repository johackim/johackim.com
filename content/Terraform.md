---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: terraform
publish: true
rss: true
---

[Terraform](https://terraform.io/) est un logiciel open-source pour construire, modifier et versionner une infrastructure de manière sûre et efficace.

C'est un outil infrastructure as code.

Vous utilisez des fichiers de configuration au format .tf (HashiCorp) pour décrire les composants que vous souhaitez avoir dans votre infrastructure et Terraform s'occupe de générer un plan d'exécution et de l'exécuter.

Terraform supporte beaucoup de [fournisseurs d'infrastructure cloud](https://registry.terraform.io/search/providers) :

- [Scaleway](https://registry.terraform.io/providers/scaleway/scaleway/latest/docs)
- [OVH](https://registry.terraform.io/providers/ovh/ovh/latest/docs)
- [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [OpenStack](https://registry.terraform.io/providers/terraform-provider-openstack/openstack/latest/docs)
- [Azure](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [GCP](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- ect...

## Installation

Pour installer Terraform, rendez-vous sur [la page de téléchargement](https://terraform.io/downloads.html).

Téléchargez et installez le fichier adapté à votre système d'exploitation (Linux, Mac ou Windows).

Sur Arch Linux :

```bash
sudo pacman -S terraform
```

## Utilisation

Initialiser Terraform :

```bash
terraform init
```

Vérifier la configuration :

```bash
terraform plan
```

Mettre à jour l'infrastructure :

```bash
terraform apply
```

Importer un objet existant :

```bash
terraform import openstack_lb_loadbalancer_v2.lb_1 <ID>
```

Voir l'état actuel de l'infrastructure :

```bash
terraform show
```

Gérer un workspace :

```bash
terraform workspace new <name> # Créer un workspace (ex: dev, prod)
terraform workspace select <name> # Sélectionner un workspace
terraform workspace delete <name> # Supprimer un workspace
terraform workspace list # Lister les workspaces
```

Linter les fichiers .tf :

```bash
terraform fmt -check -recursive
```

Détruire une infrastructure :

```bash
terraform destroy
```

---

Références :

- https://developer.hashicorp.com/terraform/install