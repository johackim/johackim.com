---
datePublished: 2021-05-17T17:32
dateUpdated: 2021-05-17T17:32
permalink: installer-terraform
publish: true
rss: true
note: 52
---

Pour installer Terraform, rendez-vous sur [la page de téléchargement](https://terraform.io/downloads.html).

Téléchargez et installez le fichier adapté à votre système d'exploitation (Linux, Mac ou Windows).

Exemple pour linux :

```bash
wget https://releases.hashicorp.com/terraform/0.15.3/terraform_0.15.3_linux_amd64.zip
unzip terraform_0.15.3_linux_amd64.zip
sudo mv terraform /usr/local/bin
```

```bash
terraform -version # Terraform v0.15.3
```

---

Références :

- [[Terraform]]