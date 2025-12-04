---
datePublished: 2021-07-11T09:50
dateUpdated: 2021-07-11T09:50
permalink: demarrer-une-application-gui-avec-ssh
publish: true
rss: true
note: 67
---

Voici un petit tutoriel pour lancer une application graphique à distance via SSH.

## 1. Activer le X11 Forwarding

Commencez par ajouter le paramètre `X11Forwarding yes` au fichier `/etc/ssh/sshd_config` de votre serveur puis redémarrer votre serveur SSH :

```bash
echo 'X11Forwarding yes' | sudo tee -a /etc/ssh/sshd_config
sudo systemctl restart sshd
```

## 2. Lancer votre application

Connectez-vous à votre serveur via une commande SSH avec le paramètre `-X` suivi du nom de votre application (ex : `mousepad`) :

```bash
ssh -X <user>@<ip> mousepad
```

## 3. Optimiser la vitesse d'affichage

Pour accélérer la vitesse d'affichage, vous pouvez activer la compression avec le paramètre `-C` et utiliser un cipher plus rapide (ex : `aes128-ctr`) :

```bash
ssh -X -C -c aes128-ctr <user>@<ip>
```

Pour consulter la liste des ciphers disponibles de votre serveur SSH, utilisez la commande `sudo sshd -T | grep -i cipher`.

Activez le multiplexing en ajoutant les lignes suivantes dans le fichier `~/.ssh/config` de votre machine hôte :

```txt
Host *
    ControlMaster auto
    ControlPath ~/.ssh/%r@%h:%p
```

Maintenant vous avez accès à vos applications graphiques distantes directement depuis votre machine hôte 😀🎉.

PS : Si comme moi vous rencontrez un problème de touche de clavier non fonctionnelle (ex : AltGr), utilisez le paramètre `-Y` au lieu de `-X`.

---

Références :

- [[SSH]]