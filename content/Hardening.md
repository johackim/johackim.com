---
datePublished: 2021-05-18T21:17
dateUpdated: 2021-05-18T21:17
permalink: hardening
publish: true
rss: true
aliases:
  - Durcissement
---

Le durcissement (ou **hardening** en anglais) est un processus destiné à sécuriser un système en réduisant le plus possible sa surface d'attaque.

Pour ça, on supprime tout ce qui n'est pas indispensable :

- Utilisateurs et droits inutiles
- Mots de passe par défaut
- Bibliothèques logicielles inutiles
- Fichiers de configurations inutiles
- Services inutiles
- etc...

Pour automatiser ce processus d'hardening sur un serveur Ubuntu ou Debian il est possible d'utiliser Ansible avec le dépot [ansible-collection-hardening](https://github.com/dev-sec/ansible-collection-hardening/) :

```bash
apt update && apt install -yq python3-pip && pip3 install ansible
ansible-galaxy collection install devsec.hardening
```

```yaml
# playbook.yml
- hosts: localhost
  collections:
    - devsec.hardening
  roles:
    - os_hardening
```

```bash
ansible-playbook playbook.yml
```

---

Références :

- https://github.com/trimstray/the-practical-linux-hardening-guide