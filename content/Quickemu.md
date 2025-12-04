---
datePublished: 2022-06-16T11:52
dateUpdated: 2022-06-21T05:34
permalink: quickemu
publish: true
rss: true
note: 71
---

[Quickemu](https://github.com/quickemu-project/quickemu) est un logiciel pour rapidement démarrer des machines virtuelles depuis Linux.

## Installation

```bash
yay -S --noconfirm quickemu
sudo pacman -Syy qemu qemu-ui-gtk qemu-ui-sdl
```

## Démarrer une machine virtuel Ubuntu

```bash
quickget ubuntu 22.04
quickemu --vm ubuntu-22.04.conf
```

## Démarrer une machine virtuel Arch Linux

```bash
quickget archlinux latest
quickemu --vm archlinux-latest.conf
```

## Démarrer une machine virtuel Android

```bash
quickget android 9.0
quickemu --vm android-9.0-x86.conf
```

## Supprimer un disque

```bash
quickemu --delete-disk --vm ubuntu-22.04.conf
```

## Stopper qemu

```bash
pkill -f qemu-system-x86_64
```

---

Références :

- https://korben.info/quickemu.html
- [[Linux]]
- [[Virtualisation]]