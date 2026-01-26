---
title: Comment jouer sur Linux avec 95% de performance native ?
permalink: jouer-sur-linux
datePublished: 2018-03-26T05:53
dateUpdated: 2018-03-26T05:53
description: Voici une solution pour pouvoir jouer aux jeux video depuis un environnement Linux avec 95% de performance native.
aliases:
  - Comment jouer sur Linux avec 95% de performance native ?
publish: true
rss: true
note: 88
---

Voici une solution pour pouvoir jouer aux jeux vidéos depuis un environnement [[Linux]] avec 95% de performance native.

[Une vidéo de démonstration par blu3bird84](https://youtube.com/watch?v=37D2bRsthfI)

## Terminologies

Avant toute chose, il y a quelques terminologies à connaitre :

- **KVM** (Kernel-based Virtual Machine) est le module du noyau Linux qui interagit avec les fonctionnalités de virtualisation du processeur. C'est un hyperviseur de type I pour Linux.
- **QEMU** est le logiciel de virtualisation basé sur KVM qui émule les processeurs virtuels et les périphériques et qui lance et éteint les machines virtuelles.
- **virt-manager** est l'interface graphique qui permet de créer, configurer, et faire tourner les machines virtuelles.
- **libvirt** est la bibliothèque qui permet à virt-manager d'interagir avec les capacités de virtualisation fournies par QEMU.
- **virtio** est une interface de programmation qui gère toutes les communications entre l'hyperviseur et le noyau.
- **OVMF** (Open Virtual Machine Firmware) est un projet pour permettre le support de l‘UEFI aux machines virtuelles.
- **vfio** Virtual Function I/O
- **IOMMU** Unité de gestion de mémoire d'entrée-sortie

## Prérequis

- Avoir deux Carte-graphiques ou 1 Apu et une Carte-graphique
- Votre carte mère doit supporter la technologie IOMMU
- Votre CPU doit supporter la virtualisation matérielle
- Votre carte graphique doit supporter l’UEFI
- Avoir 2 Entrées vidéo sur l'écran (1 pour le linux (host) et 1 pour la Machine virtuelle (Guest)

## Installation

L'installation que je propose ici est spécifiquement prévue pour **Arch Linux** ou une distribution basé dessus comme **[Antergos](https://antergos.com/)**. Cette procédure aura pour but d'installer un environnement **Qemu/KVM + VFIO/IOMMU GPU Passthrough** afin de pouvoir jouer aux jeux depuis Linux sur une **machine virtuelle** Windows.

### Activer IOMMU

```bash
# /etc/default/grub
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash intel_iommu=on"
```

```bash
grub-mkconfig -o /boot/grub/grub.cfg
dmesg|grep -e DMAR -e IOMMU # Vérifier l'activation de IOMMU
```

### Installer libvirt, qemu, virt-manager et OVMF

```bash
pacman -S dnsmasq ebtables dmidecode # libvirt dependencies
pacman -S qemu ovmf virt-manager
pacman -S libvirt
usermod -aG libvirt username
systemctl enable libvirtd
```

### Configurer qemu

```bash
mv /etc/libvirt/qemu.conf /etc/libvirt/qemu.conf.orig
cat <<EOT >> /etc/libvirt/qemu.conf
user = "root"
group = "root"
clear_emulator_capabilities = 0
cgroup_device_acl = [
    "/dev/null", "/dev/full", "/dev/zero",
    "/dev/random", "/dev/urandom",
    "/dev/ptmx", "/dev/kvm", "/dev/kqemu",
    "/dev/rtc","/dev/hpet", "/dev/vfio/vfio",
    "/dev/vfio/1"
]
nvram = [
  "/usr/share/ovmf/x64/OVMF_CODE.fd:/usr/share/ovmf/x64/OVMF_VARS.fd"
]
EOT
```

### Installer vfio

```bash
lspci -nn|grep -iP "NVIDIA|Radeon" # $VFIOID
echo options vfio-pci ids=$VFIOID > /etc/modprobe.d/vfio.conf

MODULES="vfio vfio_iommu_type1 vfio_pci vfio_virqfd" # /etc/mkinitcpio.conf
mkinitcpio -p linux

lspci -k | grep -i vfio-pci # Check vfio
```

### Installer virtio

```bash
pacaur -S virtio-win
echo -e 'virtio\virtio_blk\virtio_pci\virtio_net' | sudo tee /etc/modules-load.d/virtio.conf
lsmod | grep virtio # Check virtio modules
```

## Configuration de la machine virtuelle

Une fois que l'environnement est prêt, il faut créer et configurer notre machine virtuelle avec `virt-manager`. Plutôt que de mettre une centaine de screenshots voici une vidéo (en anglais) qui donne étape par étape la configuration de notre machine virtuelle.

[Configuration d'une machine virtuelle Windows avec virt-manager](https://youtube.com/watch?v=6FI31QDtyy4)

## Configuration réseau

Pour configurer une connexion réseau sur votre machine virtuelle :

1. Edit -> Connection Details -> Virtual Networks -> Add Network
2. Create "br0" virtual network with "Forwarding to physical network" option and Physical device wlp59s0
3. `virsh edit <VM_name>` and add :

```config
<interface type='network'>
  <mac address='53:54:00:b8:65:3d'/>
  <source network='br0'/>
</interface>
```

## Ma configuration

Si vous avez suivie toutes les étapes, vous devriez avoir votre machine virtuelle prête à l'emploi pour jouer à vos jeux préférés.

De mon côté, j'ai un Laptop, ce qui implique [une configuration particulière](https://gist.github.com/Misairu-G/616f7b2756c488148b7309addc940b28). Pour le moment, je peux seulement lancer ma VM avec un serveur VNC, je n’ai pas réussi à rendre fonctionnelle ma sortie HDMI sur un écran :(.

Voilà à quoi ressemble ma configuration :

```bash
sudo /usr/sbin/qemu-system-x86_64 \
-cpu host,kvm=off \
-enable-kvm \
-m 4096 \
-smp cores=4,threads=2 \
-device vfio-pci,host=01:00.0 \
-drive if=pflash,format=raw,readonly,file=/usr/share/ovmf/x64/OVMF_CODE.fd \
-drive if=pflash,format=raw,file=/usr/share/ovmf/x64/OVMF_VARS.fd \
-drive file=/var/lib/libvirt/images/win10.qcow2,format=qcow2,if=none,id=disk0,cache=writeback \
-device virtio-blk-pci,scsi=off,bus=pci.0,addr=0x8,drive=disk0,id=virtio-disk0,bootindex=1 \
-netdev type=tap,script=no,downscript=no,id=net0,ifname=tap2 \
-device virtio-net-pci,netdev=net0,disable-legacy=on,iommu_platform=true,romfile= \
-boot menu=on
```

---

Références :

- https://wiki.archlinux.org/index.php/PCI_passthrough_via_OVMF
- https://wiki.archlinux.fr/PCI_passthrough_avec_OMVF
- https://medium.com/@dubistkomisch/7c395dde5c2
- https://davidyat.es/2016/09/08/gpu-passthrough/
- https://wiki.installgentoo.com/index.php/PCI_passthrough
- https://clubnix.fr/blog-post/fira/notes-actuelles-sur-le-passthrough-vga
- https://gist.github.com/Misairu-G/616f7b2756c488148b7309addc940b28
- https://linuxserver.io/2017/04/28/how-to-setup-vfio-gpu-passthrough-using-ovmf-and-kvm-on-arch-linux/
- https://docs.fedoraproject.org/quick-docs/en-US/creating-windows-virtual-machines-using-virtio-drivers.html
- [GrayWolfTech - Play games in Windows on Linux! PCI passthrough quick guide](https://youtu.be/dsDUtzMkxFk)
- [Tymscar - Native Performance Windows Games On Linux Quick GPU Passthrough](https://youtu.be/6FI31QDtyy4)
- [[Jeux vidéos]]
- [[Qemu]]