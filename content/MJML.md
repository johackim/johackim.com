---
title: Automatiser l'envoie d'une newsletter avec mjml et nodemailer
permalink: automatiser-envoie-newsletter-mjml-nodemailer
datePublished: 2017-11-27T08:00
dateUpdated: 2017-11-27T08:00
description: Cet article est destiné à toutes les personnes souhaitant automatiser l'envoie de leur newsletter avec de jolis e-mails responsive et la possibilité d'injecter du contenue dynamiquement comme les derniers articles d'un blog.
publish: true
rss: true
note: 79
---

Cet article est destiné à toutes les personnes souhaitant automatiser l'envoie de leur newsletter avec de jolis e-mails **responsive** et la possibilité d'injecter du contenue **dynamiquement** comme les derniers articles d'un blog.

Mon blog [ghost](https://ghost.org/) permet de stocker les emails des subscribers, mais pas la création ni l'envoi d'une **newsletter**. En attendant cette feature, je me suis fait un petit script maison pour **automatiser l'envoi des 4 derniers articles de mon blog** chaque mois.

Ce script nodejs va tout simplement parser mon [flux RSS](https://johackim.com/rss/) et injecter les articles dans un template **mjml** créé sur [mjml.io](https://mjml.io/try-it-live) (framework qui permet de créer très facilement des emails responsive) qui sera envoyé chaque mois aux subscribers de mon blog via **nodemailer**.

```javascript
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { mjml2html } from 'mjml';
import feedparser from 'feedparser-promised';
import Papa from 'papaparse';
import fs from 'fs';
import Newsletter from './newsletter';

dotenv.config({ silent: true });

(async () => {
    const articles = (await feedparser.parse(process.env.FEED_URL)).map(item => ({
        title: item.title,
        href: item.link,
        tag: item.categories[0],
        image: item.enclosures[0].url,
    })).slice(0, process.env.NUMBER_ARTICLES);

    const newsletter = Newsletter(articles);
    const htmlOutput = mjml2html(newsletter).html;

    if (process.env.NODE_ENV === 'test') {
        fs.writeFileSync('newsletter.html', htmlOutput);
        process.exit(0);
    }

    const transporter = nodemailer.createTransport({
        port: process.env.MAIL_PORT,
        host: process.env.MAIL_HOST,
        tls: process.env.MAIL_TLS,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.MAIL_FROM,
        subject: process.env.MAIL_SUBJECT,
        html: htmlOutput,
    };

    const subscribersCsvFile = fs.readFileSync(process.env.SUBSCRIBERS_FILE_PATH).toString();
    const subscribers = Papa.parse(subscribersCsvFile, { header: true }).data;
    const emails = subscribers.filter(subscriber => subscriber.email).map(subscriber => subscriber.email);

    emails.forEach((email) => {
        transporter.sendMail({ ...mailOptions, to: email });
    });
})();
```

Les variables d'environnement à éditer se situent dans le fichier `.env` :

```env
MAIL_HOST=mail.domain.com
MAIL_USER=contact@domain.com
MAIL_PASS=password
MAIL_PORT=587
MAIL_FROM="username <contact@domain.com>"
MAIL_SUBJECT="Newsletter"
MAIL_TLS=true
FEED_URL=http://domain.com/feed/
SUBSCRIBERS_FILE_PATH=subscribers.csv
NUMBER_ARTICLES=4
```

Si vous ne souhaitez pas écrire en dur votre mot de passe dans ce fichier, vous pouvez le déclarer de cette façon :

```bash
MAIL_PASS=password npm start
```

Ce code source est écrit pour un cas spécifique, mais il peut être adapté très facilement selon vos besoins. Il s'agit ici de seulement 50 lignes de code et d'un template mjml à adapter. Si vous désirez plus d'amélioration faite en part dans les commentaires ;).

Voilà, il est possible de l'automatiser avec une tâche cron et vous avez une newsletter qui envoie chaque mois les derniers articles de votre blog :

```cron
0 0 1 * * npm start --prefix <PATH_DIRECTORY>
```

Si vous souhaitez simplement tester le rendu de votre newsletter sans envoyer de mails :

```bash
npm test # Generate newsletter.html
```

Le code source est disponible en détails sur [ce dépôt github](https://github.com/johackim/newsletter).