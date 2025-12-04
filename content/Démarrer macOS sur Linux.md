---
datePublished: 2021-08-22T20:37
dateUpdated: 2021-08-22T20:37
permalink: demarrer-macos-sur-linux
publish: true
rss: true
note: 74
---

Pour démarrer macOS sur [[Linux]], il existe 2 solutions :

## Avec mac-on-linux-with-qemu

Il existe [ce dépôt Github](https://github.com/arindas/mac-on-linux-with-qemu) qui permet de démarrer macOS en une seule ligne de commande à condition d'avoir les prérequis suivants :

```bash
# Arch Linux
sudo pacman -Syy qemu python-click qemu-ui-gtk qemu-ui-sdl
yay -S --noconfirm dmg2img

# Debian, Ubuntu
sudo apt install -y qemu-kvm dmg2img pulseaudio
sudo pip install -U click
sudo ln -s /usr/bin/qemu-system-x86_64 /usr/bin/qemu
```

Une fois installé exécuter la commande `run.sh` :

```bash
git clone https://github.com/arindas/mac-on-linux-with-qemu
cd mac-on-linux-with-qemu
./run.sh
```

> [!NOTE]
>
> - Choose `Disk Utility` and then select the largest `Apple Inc. VirtIO Block Media` disk.
> - Click the `Erase` button to format the disk to APFS, and give it any recognizable name you like.

`CTRL` + `ALT` + `G` pour sortir de la VM.

## Avec QuickEmu

Vous pouvez aussi utiliser [[Quickemu]] :

```bash
yay -S --noconfirm quickemu qemu qemu-ui-gtk qemu-ui-sdl
quickget macos catalina
quickemu --vm macos-catalina.conf
```

Une fois macOS démarré, supprimez la partition `Apple Inc. VirtIO Block Media` puis lancez l'installation.

---

Références :

- https://korben.info/vm-macos-linux.html