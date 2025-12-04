---
title: Bloquer les adresse IPs d'un réseau externe avec Express.js
permalink: bloquer-les-adresse-ips-dun-reseau-externe-avec-expressjs
datePublished: 2021-08-01T21:31
dateUpdated: 2021-08-01T21:31
publish: true
rss: true
note: 46
---

Je dispose d'un serveur nodejs avec express et j'ai besoin d'autoriser l'accès à une route uniquement aux adresses IP de mon réseau interne.

Pour ça, j'utilise une librairie : `express-ipfilter` :

```js
// index.js

import express from 'express';
import { IpFilter, IpDeniedError } from 'express-ipfilter';

const app = express();

const clientIp = (req) => {
    return req.headers['x-forwarded-for'] ? (req.headers['x-forwarded-for']).split(',')[0] : req.socket.remoteAddress;
};

const ips = ['172.17.0.0/16', '10.10.0.0/16', '127.0.0.1', '::1'];

app.use(IpFilter(ips, { mode: 'allow', detectIp: clientIp }));

app.use((err, req, res, next) => {
    if (err instanceof IpDeniedError) {
        res.status(401);
        return res.end('You shall not pass');
    }

    return next();
});

app.get('/', async (req, res) => {
    res.end('Secure route');
});

export default app;
```