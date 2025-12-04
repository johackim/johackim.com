---
title: Le kit de survie d'un développeur
permalink: kit-de-survie-developpeur
datePublished: 2018-10-12T06:00
dateUpdated: 2018-10-12T06:00
description: Avez-vous déjà entendu parler des nomades digitaux ? J'ai récemment découvert ce style de vie qui consiste à travailler n'importe où dans le monde, tant qu'une connexion internet est disponible.
publish: true
rss: true
---

> [!INFO]
> Contenu archivé

Avez-vous déjà entendu parler des nomades digitaux ? J'ai récemment découvert ce style de vie qui consiste à travailler n'importe où dans le monde, tant qu'une connexion internet est disponible. Inspiré par cette méthode, je me suis créé un petit EDC (Everyday Carry) avec lequel je me déplace chaque jour.

## Razer Blade 14” (2016)

![](https://i.imgur.com/G6N9zs2.jpg)

Mon ordinateur portable est un Razer Blade 14" (2016). [Je l'ai acheté dès sa sortie aux États-Unis alors qu'il n'était pas encore disponible en Europe](https://johackim.com/comment-acheter-article-non-expediable-en-france/). Je recherchai un PC léger, fin et ultra performant, c'est à ma connaissance le meilleur du marché pour ces 3 points réunis.

```markdown
# Configuration matérielle

- CPU: Intel Core i7-6700HQ @ 8x 3.5GHz
- GPU: GeForce GTX 970M
- RAM: 16 Go
```

## Hub USB-C Novoo

Un [hub USB-C Novoo](https://amzn.to/3f7LqTx) Pour pouvoir profiter de ports supplémentaires (Ethernet, USB, SD et microSD) cet adaptateur est parfait !

## Clé USB SanDisk Extreme Chiffré

Je chiffre certains documents (diplômes, carte d'identité, carte vitale, permis de conduire) sur [cette clé USB](https://amzn.to/3tDjyfC) que je porte toujours sur moi. On est jamais trop prévoyant, cela peut être très utile en cas de disparition de documents (vol, inondation, incendie, catastrophes naturelles...).

**Astuce**: Si vous êtes sur un environnement Linux et que vous souhaitez vous aussi chiffrer votre clé USB en AES 512 voici les commandes à exécuter :

```bash
parted -s /dev/sdb mklabel msdos
parted -s /dev/sdb mkpart primary 1MiB 100%
cryptsetup -q luksFormat -c aes-xts-plain64 -s 512 /dev/sdb1
cryptsetup -q luksOpen /dev/sdb1 crypt
mkfs.ntfs /dev/mapper/crypt
cryptsetup luksClose crypt
```

## Casque Bose QuietComfort 35

J'utilise [ce casque antibruit](https://bose.life/3pT4sUR) chaque jour pour être dans ma bulle lorsque je travaille.

## Blackphone BP1

![](https://i.imgur.com/Gqne66g.jpg)

Le Blackphone est actuellement le seul téléphone sur le marché qui protège plus ou moins la vie privée. Encore sous Android 4.4 et n'étant plus maintenu je le garde jusqu'à ce que le [Librem Phone](https://puri.sm/shop/librem-5/) (téléphone sous Linux) sorte.

## Batterie externe USB (Pineapple Juice 4000)

![](https://i.imgur.com/J4rP0bc.jpg)

Voici la batterie externe USB que j'utilise dans le cas ou mon téléphone tombe en rade. Je l'ai reçu en même temps que mon **WiFi Pineapple NANO** (je ferai un article prochainement sur cet équipement).

## BUBM Organizer

Pour transporter tout ce petit matériel, j'ai besoin d'un espace de rangement et ce [BUBM organizer](https://amzn.to/3nK4Cvd) est très pratique pour ça.

## Cahier Oxford International Activebook A4+

J'ai toujours [ce cahier](https://my-oxford.com/fr-fr/node/455) sur moi pour rédiger toutes mes notes.

## Stylo FriXion Ball

![](https://i.imgur.com/kLD5VcT.jpg)

Pour écrire, j'utilise toujours des stylos effaceurs comme ce FriXion Ball.

## Sac à dos Dakine

![](https://i.imgur.com/CKAPoeq.jpg)

Un sac à dos Dakine avec un compartiment pour mon ordinateur et des attaches pour accrocher mon skate.

## Ceinture décapsuleur

![](https://i.imgur.com/8uVsCQM.jpg)

Très pratique en soirée.

## Attache vélo CYCLYK

![](https://i.imgur.com/VJYRRd0.jpg)

Je fais quasiment tous mes déplacements à vélo, c'est pourquoi cette attache m'est indispensable pour visualiser mes trajets en temps réel. Cette attache CYCLYK ne coûte pas grand-chose et s'adapte à tous les téléphones et sur tous les vélos.

Le reste est un peu plus courant :

- Portefeuille
- Prise secteur USB
- Lunettes de soleil
- Chiffonnette PC
- Chewing-gums
- Mini Câble Ethernet
- Mouchoirs
- Clés

## Conclusion

J'utilise ce kit au quotidien, il me permet de travailler à peu près partout. Il ne me manque plus qu'un couteau suisse et ça serait parfait.

Je dispose aussi d'un autre **EDC** qui ressemble plus à un **Survival Kit**, utile en cas de réel coup dur comme une catastrophe naturelle, une crise économique ou que sais-je. Je ferai bientôt un article dessus.

Et vous c'est quoi votre EDC ?

PS: Je précise que je n'ai aucun partenariat avec toutes les marques citées dans cet article.