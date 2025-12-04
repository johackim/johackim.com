---
title: Installation simple d'un cluster kubernetes
permalink: installation-simple-cluster-kubernetes
datePublished: 2017-11-10T17:52
dateUpdated: 2017-11-10T17:52
description: Voici deux méthodes pour installer simplement kubernetes. La première est une installation locale avec minikube, et la deuxième je l'ai réalisé sur mon cluster proxmox avec kubeadm.
publish: true
rss: true
note: 91
---

Vu la popularité du projet (dépôt github le plus discuté avec +350 000 commentaires) et faisant partie du monde des containers, je n'ai pas pu résister à l'envie de tester **kubernetes**. Voici deux méthodes pour installer simplement kubernetes. La première est une installation locale avec [minikube](https://github.com/kubernetes/minikube), et la deuxième je l'ai réalisé sur [[Homelab|mon cluster proxmox]] avec [kubeadm](https://github.com/kubernetes/kubeadm).

## 1. Installation de Minikube

**NOTE**: Il est **déconseillé** d'utiliser **[minikube](https://github.com/kubernetes/minikube)** dans un environnement de production, il s'agit plus d'une installation à usage personnel sur son laptop afin de tester kubernetes.

L'installation est simple, un binaire à télécharger et à exécuter :

```bash
wget -O /usr/local/bin/minikube https://github.com/kubernetes/minikube/releases/download/v0.23.0/minikube-linux-amd64
chmod +x /usr/local/bin/minikube
```

Une fois installé on démarre notre cluster kubernetes single node en une seule commande, l'installation se fera à l'intérieur d'une VM, personnellement j'utilise **virtualbox** :

```bash
minikube start --vm-driver=virtualbox
```

On peut déjà jouer avec **kubernetes** et installer un blog ghost par exemple :

```bash
kubectl run ghost --image=ghost
kubectl expose deployment ghost --type=NodePort --port=80 --target-port=2368
```

L'accès à celui-ci peut se faire de cette façon :

```bash
export IP=$(minikube ip)
export NODE_PORT=$(kubectl get services ghost -o go-template='{{(index .spec.ports 0).nodePort}}')
curl http://$IP:$NODE_PORT
```

## 2. Installation de Kubeadm

L'utilisation de **[kubeadm](https://github.com/kubernetes/kubeadm)** est aussi déconseillée en production car **kubeadm** est encore en **bêta**, mais n'étant pas un géant du web je me le permets quand même. J'ai déployé plusieurs VM **Ubuntu 16.04 LTS** sur mon cluster proxmox. Une qui fera office de master et les autres de workers. Sans proxmox vous pouvez très bien créer vos machines via vagrant :

```bash
vagrant init ubuntu/xenial64
vagrant up
```

L'installation des dépendances d'un noeud kubernetes (master ou worker) devra s'effectuer comme suit :

```bash
# Installation des dépendances d'un noeud kubernete

apt-get update && apt-get install -y apt-transport-https docker.io
echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" >> /etc/apt/sources.list.d/kubernetes.list
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
apt-get update && apt-get install -y kubelet kubeadm kubernetes-cni
swapoff -a # Kubernetes ne supporte pas le SWAP
```

### Master node

Une fois les dépendances installées et le SWAP désactivé sur chacun des noeuds, nous pouvons installer le master :

```bash
kubeadm init --pod-network-cidr=10.32.0.0/12
```

Il est possible de gérer notre cluster depuis notre PC avec kubectl, il suffit de copier le fichier `/etc/kubernetes/admin.conf` accessible sur votre noeud master dans votre répertoire `$HOME/.kube/config`.

```bash
scp root@<master ip>:/etc/kubernetes/admin.conf ~/.kube/config
```

Je suis sur arch linux donc un simple `pacaur -S kubectl-bin` m'installe le client, sinon c'est juste [un binaire a installer](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

Pour vérifier le bon fonctionnement on peut faire un petit `kubectl version` depuis notre PC.

L'installation d'un **pod network add-on** est requis, c'est ce qui va permettre de faire communiquer les **pods** entre eux. Il en existe plusieurs ([voici la liste](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/#pod-network)), moi j'utilise **kube-router**.

```bash
kubectl apply -f https://raw.githubusercontent.com/cloudnativelabs/kube-router/master/daemonset/kubeadm-kuberouter.yaml
```

Après quelques secondes le node master devrait être ready (`kubectl get nodes` pour vérifier).

### Worker nodes

Pour ajouter d'autres noeuds à notre cluster c'est très simple, la commande `kubeadm init` exécutée précédemment à du vous afficher une commande `kubeadm join` suivit d'un token qui devrait ressembler à ça :

```bash
kubeadm join --token <TOKEN> <IP>
```

Une fois cette commande exécutée on vérifie encore une fois que le(s) noeud(s) sont correctement ajouté(s) avec `kubectl get nodes`.

On peut jouer avec notre cluster et par exemple déployer plusieurs replica de nginx :

```bash
kubectl run ghost --image=nginx
kubectl scale deployment nginx --replicas=4
kubectl expose deployment nginx --type=NodePort --port=80 --target-port=80
export NODE_PORT=$(kubectl get services nginx -o go-template='{{(index .spec.ports 0).nodePort}}')
curl http://192.168.1.50:$NODE_PORT
```

### (Optionel) Utiliser seulement un noeud

Si vous ne voulez pas utiliser d'autre noeud que le master pour ne pas s'embêter avec plusieurs VM par exemple c'est possible :

```bash
# Allow a single-host cluster
kubectl taint nodes --all node-role.kubernetes.io/master-
```

PS: Si jamais vous avez tout cassé ^^ et que votre cluster ne fonctionne plus vous pouvez reset votre installation avec un `kubeadm reset`.

## Conclusion

Kubernetes facilite l'utilisation des containers sur des grosses infrastructures et propose une manière simple de faire de l'auto-scaling. Ça permet de se concentrer sur le développement et l'amélioration de son application et moins sur la gestion de ses serveurs.

Maintenant il me reste d'autres outils liés à kubernetes à découvrir comme [draft.sh](https://draft.sh/), [helm.sh](https://helm.sh/) et [fission](https://github.com/fission/fission)

Je n'ai pas abordé les détails de l'utilisation de kubernetes, il s'agit simplement d'un mini guide d'installation pour découvrir l'outil, Si vous souhaitez en savoir davantage sur kubernetes voici quelques ressources qui m'ont été très utiles sur sa compréhension et son utilisation :

Un [tutoriel interactif](https://kubernetesbootcamp.github.io/kubernetes-bootcamp/) très efficace que je conseille à tous. Et ces deux vidéos, la première est théorique et l'autre est plus accès sur la pratique.

Voilà ! Comme d'habitude si vous avez des questions, suggestions n'hésitez pas à les soumettre dans les commentaires ! Bon week-end ;)

---

Références :

- [Mon aide mémoire des commandes kubernetes](https://github.com/johackim/dotfiles/blob/d4a5a8f5e3390acf9e4dcbfe441a6447279e0527/.cheat/kubernetes)
- [https://kubernetes.io/](https://kubernetes.io/)
- [https://github.com/ramitsurana/awesome-kubernetes/](https://github.com/ramitsurana/awesome-kubernetes/)
- [http://kubernetesbyexample.com/](http://kubernetesbyexample.com/)