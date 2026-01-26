---
title: Est-ce que notre téléphone nous écoute ?
permalink: est-ce-que-notre-telephone-nous-ecoute
datePublished: 2025-12-03T20:34:44
dateUpdated: 2025-12-03T20:34:44
aliases: [Est-ce que notre téléphone nous écoute ?]
publish: true
rss: true
---

Tous nos téléphones sont équipés d'un microphone 🎤.

- 🏛️ Les **gouvernements** pourraient s'en servir pour surveiller et stopper les opposants politiques ou les terroristes.
- 💼 Les **entreprises** pourraient s'en servir pour nous proposer des publicités ciblées et augmenter leurs profits.
- 🥷 Les **hackers** pourraient s'en servir pour nous espionner et voler nos informations personnelles.

À l'échelle d'un pays comme la France (+67 millions d'habitants), cela représenterait une mine d'or d'informations à exploiter 💰.

Sachant cela, la question est légitime, **est-ce que notre téléphone nous écoute ?**

## Est-ce techniquement possible ?

Techniquement, espionner les conversations de millions de personnes 24h/24 reviendrait à **envoyer, stocker, transcrire, analyser et filtrer des quantités astronomiques de données**.

À titre d'exemple, un enregistrement audio de 1 minute représente environ entre 10 et 100 ko de données.

Pour "seulement" 1 million de personnes, cela représenterait 100 Go de données par minute, soit 144 To par jour.

Il faudrait investir dans d'énormes espaces de stockage et des serveurs avec une très grande puissance de calcul.

Le coût financier serait bien supérieur à la rentabilité des informations collectées.

Et même si la transcription était réalisée localement sur le téléphone, cela impacterait considérablement la batterie et les performances du téléphone.

Ce qui serait en contradiction avec l'objectif des constructeurs de téléphones qui veulent fabriquer des téléphones plus performants et avec une meilleure autonomie.

Et un tel trafic réseau ne passerait pas inaperçu du point de vue des experts en cybersécurité.

La probabilité pour que personne ne s'en rende compte est extrêmement faible.

Les **assistants vocaux** comme Siri (Apple), Alexa (Amazon) ou Assistant (Google) font ce que l'on appelle de **l'écoute passive**.

Il s'agit d'un processus qui tourne en boucle sur une mémoire tampon de quelques secondes et qui a pour seul but de démarrer un enregistrement uniquement lorsqu'il entend **le mot réveil** ⏰ « Dis Siri », « OK Google » ou « Alexa ».

Tant que le mot de réveil n'est pas déclenché, rien n'est enregistré.

## Comment vérifier si votre téléphone vous écoute ?

Vous pouvez vous-même vérifier si vos conversations sont envoyées à des services tiers en analysant le trafic réseau de votre téléphone.

Des outils comme [Wireshark](https://wireshark.org) et [PCAPdroid](https://github.com/emanuele-f/PCAPdroid) (Android) permettent d'analyser le trafic réseau de votre téléphone.

Vous pouvez voir qu'après une visite sur un site comme Google, Facebook, Twitter ou Instagram des requêtes sont envoyées sur les noms de domaines google.com, facebook.com, twitter.com ou instagram.com.

<iframe src="https://peertube.ethibox.fr/videos/embed/25806d5b-589e-491c-860b-38b8e3eaad83?loop=1&amp;autoplay=1&amp;title=0&amp;warningTitle=0&amp;controlBar=0&amp;peertubeLink=0&amp;p2p=0" style={{ width: '100%', aspectRatio: '16/9' }} frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>

En revanche, si vous parlez de "nourriture pour chat" devant votre téléphone sans rien toucher, **rien n'est envoyé**.

Dans tous les cas, **une lumière orange 🟠 (sur iPhone) et verte 🟢 (sur Android) apparaît** à chaque fois que votre microphone est utilisé.

Privilégiez les applications où le code source est libre (ex : [Firefox](https://firefox.com), [Signal](https://signal.org)) plutôt que des applications propriétaires (ex : [Chrome](https://google.com/chrome/), [WhatsApp](https://whatsapp.com)).

- Les applications propriétaires sont des boites noires où le code source est accessible uniquement par le créateur
- Les applications libres sont des boites transparentes où le code source est accessible à tout le monde

Vous pouvez vous-même inspecter les lignes de code des applications si vous avez des compétences en programmation.

Si une ligne de code est suspicieuse, elle peut être détectée et signalée par votre ami développeur ou par la communauté open-source.

## Pourquoi ai-je l'impression que mon téléphone m'écoute ?

La triste vérité, c'est que les entreprises n'ont pas besoin d'écouter vos conversations pour vous proposer des publicités ciblées.

> [!QUOTE] https://spreadprivacy.com/how-does-google-track-me-even-when-im-not-using-it/
> 86.5% des 75 000 sites les plus populaires au monde utilisent Google Analytics et 34.2% utilisent Facebook Pixel.

Résultat, lorsque vous créez un compte Google ou Facebook et que vous vous baladez sur internet, ils récupèrent tout votre historique de navigation.

Si vous partagez des informations comme votre âge, votre adresse IP, votre géolocalisation, vos photos et vos centres d'intérêt, ils peuvent vous proposer des publicités ultra-ciblées.

Il se peut aussi que vous soyez victime d'un [[Biais cognitifs|biais cognitif]] appelé [[L'illusion de fréquence]].

![L'illusion de fréquence (https://sketchplanations.com/the-frequency-illusion)](https://i.imgur.com/AHEDdxZ.png)

Lorsque vous remarquez quelque chose pour la première fois, vous avez tendance à le voir partout.

Par exemple, si vous parlez d'une nouvelle voiture avec un ami, vous allez commencer à remarquer cette voiture partout.

## Comment protéger votre téléphone ?

Si vous souhaitez protéger votre vie privée et améliorer la sécurité de votre téléphone, voici une liste de tâches à faire :

- [ ] Désinstallez/désactivez votre assistant vocal
- [ ] Supprimer votre historique de navigation internet une fois par mois
- [ ] Désactivez les permissions des applications qui utilisent le microphone depuis les paramètres de votre téléphone
- [ ] Installer une application de messagerie sécurisée (ex: [Signal](https://signal.org))
- [ ] Installer un navigateur internet open-source (ex: [Firefox](https://firefox.com) ou [Chromium](https://chromium.org))
- [ ] Supprimer vos données personnelles d'internet via un service de suppression (ex: [Incogni](https://incogni.com))
- [ ] Installer un bloqueur de publicités sur votre navigateur internet (ex : [uBlock Origin](https://ublockorigin.com))
- [ ] Installer un [[VPN]] (ex : [ProtonVPN](https://protonvpn.com) ou [Mullvad](https://mullvad.net))
- [ ] Utiliser une boite e-mail sécurisée (ex : [ProtonMail](https://proton.me/fr/mail))
- [ ] Utiliser un serveur DNS sécurisé (ex : [quad9](https://quad9.net) ou [NextDNS](https://nextdns.io))
- [ ] Installez un système d'exploitation axé sur la vie privée ([GrapheneOS](https://grapheneos.org/), [/e/OS](https://e.foundation) ou [LineageOS](https://lineageos.org))
- [ ] Achetez un téléphone axé sur la vie privée ([Fairphone](https://fairphone.com), [Librem](https://puri.sm/products/librem-5/) ou [Pixel](https://store.google.com/fr/product/pixel_10) (avec GrapheneOS))

Pour résumer, **non, votre téléphone n'enregistre pas vos conversations**.

Les entreprises n'ont pas besoin de le faire pour vous proposer des publicités ciblées.

Et si vous souhaitez protéger votre vie privée, suivez les conseils ci-dessus 😉 !

---

Références :

- [Underscore_ - Finalement, nos téléphones pourraient bel et bien nous écouter](https://youtu.be/4P-bsrvhG1w)
- [Léo Duff - Non, votre iPhone ne vous écoute pas (c'est pire)](https://youtu.be/cwAmqc3_H8Y)
- [Defend Intelligence - Nos téléphones nous écoutent ?](https://youtu.be/-nH-iBWWbeg)
- [Aywen - J'ai vérifié si mon iPhone m'écoute](https://youtu.be/0lz2KRRGQZI)
- [Clique TV - Est-ce que nos téléphones nous écoutent ?](https://youtu.be/B7aLYH8zL7w)
- [Le Grand JD - Google nous écoute ?](https://youtu.be/ulcFCgSI4cs)
- https://korben.info/telephone-ecoute-publicite-mythe-surveillance.html
- https://korben.info/smartphone-espionnage-publicite-ciblee-mythe-realite.html
- https://numerama.com/tech/1801696-non-nos-smartphones-ne-nous-ecoutent-pas.html