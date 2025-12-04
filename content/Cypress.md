---
title: Cypress
permalink: cypress
datePublished: 2022-06-27T12:56
dateUpdated: 2022-06-29T01:29
publish: true
rss: true
note: 78
---

[Cypress](https://cypress.io/) est un framework de test E2E Node.js.

## Installation

Pour l'installer :

```bash
yarn add -D cypress
```

## Utilisation

Pour ouvrir l'interface utilisateur :

```bash
npx cypress open
```

Démarrer les tests

```bash
npx cypress run
```

Démarrer un seul test :

```bash
npx cypress run -s <path>
```

## Configuration

Créez un fichier `cypress.json` :

```json
cat > cypress.json << EOF
{
    "fixturesFolder": false,
    "pluginsFile": "__tests__/integration/plugins.js",
    "integrationFolder": "__tests__/integration/",
    "testFiles": "*.spec.js",
    "supportFile": false,
    "screenshotOnRunFailure": false,
    "trashAssetsBeforeRuns": false,
    "video": false,
    "defaultCommandTimeout": 10000,
    "requestTimeout": 10000,
    "baseUrl": "http://localhost:3000",
    "chromeWebSecurity": false,
    "retries": {
        "runMode": 2,
        "openMode": 0
    }
}
EOF
```

Ajoutez si besoin les lignes suivantes dans votre fichier `.eslintrc.json` pour configurer Eslint :

```json
{
    "plugins": [
        "cypress"
    ],
    "env": {
        "cypress/globals": true
    }
}
```

```bash
yarn add -D eslint-plugin-cypress
```

```bash
npm pkg set scripts.test:e2e="cypress run"
```

## Ajouter des sélecteurs data-test

Pour faciliter la sélection de vos éléments HTML, ajoutez des sélecteurs `data-test` ou `data-testid` dans votre code.

Exemples :

- `<input type="text" data-test=login-username />`
- `<input type="text" data-testid=login-username />`

## Supporter les variables d'environnement dotenv

Si vous souhaitez utiliser des variables d'environnements en provenance d'un fichier `.env` dans vos tests, installez la librairie suivante :

```bash
yarn add -D cypress-dotenv
```

<!-- ignore -->

Ajouter des custom commands dans le fichier [commands.js](https://docs.cypress.io/api/cypress-api/custom-commands)

Check from front : `if (window.Cypress === undefined)`

Stripe :

```js
it('Should install the app', () => {
    let stripeCheckoutUrl = '';
    cy.on('uncaught:exception', () => false);
    cy.intercept('POST', '/api/stripe', (req) => {
        req.continue((res) => {
            stripeCheckoutUrl = res.body.url;
        });
    }).as('getStripe');

    cy.visit('/');
    cy.get('[data-test="install-app"]:first').click();
    cy.wait('@getStripe').then(() => {
        cy.visit(stripeCheckoutUrl);
        cy.get('#cardNumber').type('4242424242424242');
        cy.get('#cardExpiry').type('0424');
        cy.get('#cardCvc').type('424');
        cy.get('#billingName').type('John Doe');
        cy.get('.SubmitButton').click();

        cy.url().should('contain', '/apps');
    });
});
```

<!-- end ignore -->

---

Références :

- https://github.com/cypress-io/cypress-realworld-app
- https://marmelab.com/blog/2023/11/20/screenshot-ci.html
- https://pro.academind.com/p/cypress-end-to-end-testing-getting-started
- [[Testing]]