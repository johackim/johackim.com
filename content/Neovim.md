---
datePublished: 2022-01-03T08:11
dateUpdated: 2022-01-03T08:11
title: "Neovim : la version améliorée et allégée de vim"
permalink: neovim
publish: true
rss: true
aliases:
  - nvim
note: 81
---

[Neovim](https://neovim.io/) est un éditeur de code basé sur Vim.

## Installation

Pour installer Neovim sur Arch Linux :

```bash
sudo pacman -S neovim
```

Sur Ubuntu/Debian :

```bash
sudo apt install -y neovim
```

## Installer un plugin manager

Pour installer un plugin, vous devez commencer par installer un **plugin manager**.

Personnellement, j'utiliser `vim-plug` :

```bash
curl -sfLo ~/.config/nvim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

## Installer un plugin

Pour installer un plugin (ex: [nerdtree](https://github.com/preservim/nerdtree)), créez le fichier de configuration `~/.config/nvim/init.vim` :

```vim
call plug#begin('~/.config/nvim')
  Plug 'preservim/nerdtree'
call plug#end()

nnoremap <C-n> :NERDTreeToggle<CR>
```

Puis démarrez `nvim` avec la commande `:PlugInstall`.

## Ma liste de plugins

Voici la liste des plugins que j'utilise :

```vim
Plug 'ms-jpq/chadtree' " Alternative à Nerdtree
Plug 'vimwiki/vimwiki' " Ajouter le support des wikilinks
Plug 'ctrlpvim/ctrlp.vim' " Recherche de fichiers
Plug 'dense-analysis/ale' " Linter
Plug 'tpope/vim-surround' " Surrounding
Plug 'ap/vim-css-color' " Afficher les couleurs hexadécimale
Plug 'vim-airline/vim-airline' " Bar de status
Plug 'preservim/nerdcommenter' " Commenter/décommenter avec un raccourcis
Plug 'plasticboy/vim-markdown' " Améliorer la syntax markdown
Plug 'matze/vim-move' " Déplacer les lignes simplement
Plug 'Raimondi/delimitMate' " Ajouter des parenthèses automatiquement
Plug 'mattn/emmet-vim' " Créer rapidement des balises html
Plug 'ryanoasis/vim-devicons' " Afficher des icones supplémentaires
```

## Afficher les numéros de ligne

Pour afficher les numéros de ligne dans Neovim, ajouter la ligne suivante au fichier `~/.config/nvim/init.vim` :

```vim
set number
```

## Installer un thème

Ajouter votre thème dans le dossier `~/.config/nvim/themes/`, exemple :

```bash
wget -O ~/.config/nvim/themes/boring.vim https://raw.githubusercontent.com/t184256/vim-boring/master/colors/boring.vim
```

Ou utiliser `vim-plug`, exemple :

```vim
Plug 't184256/vim-boring'
```

Puis ajouter les lignes suivantes dans votre fichier `init.vim` :

```vim
source $HOME/.config/nvim/themes/boring.vim
```

Pour supporter la transparence ajouter les lignes suivantes :

```vim
highlight Normal ctermbg=none
highlight NonText ctermbg=none
```

## Copy paste

Pour copier dans le presse papier de votre système les données selectionnée via le mode visuel de Neovim, ajouter la ligne suivante dans votre fichier de configuration :

```vim
set clipboard+=unnamedplus
```

## Vérifier la santé de neovim

```vim
:checkHealth
```

## Créer un template

```vim
" Templates
au BufNewFile Dockerfile r ~/.config/nvim/templates/Dockerfile
```

## Autocmd

Afficher le nombre de lignes lorsque l'on entre dans le buffer d'un fichier markdown :

```bash
au BufEnter *.md set number
```

- https://learnvimscriptthehardway.stevelosh.com/chapters/12.html
- http://vimdoc.sourceforge.net/htmldoc/autocmd.html

---

Références :

- https://github.com/johackim/dotfiles/
- https://github.com/NvChad/NvChad
- https://neovimcraft.com/
- https://github.com/onivim/oni2
- https://github.com/hrsh7th/nvim-cmp
- https://github.com/epwalsh/obsidian.nvim
- https://github.com/nvim-neorg/neorg
- https://github.com/AstroNvim/AstroNvim
- https://github.com/olimorris/codecompanion.nvim