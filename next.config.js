const intercept = require('intercept-stdout');
const redirects = require('./redirects.json');

intercept((text) => (text.includes('Duplicate atom key') ? '' : text));

module.exports = {
    staticPageGenerationTimeout: 180,
    async redirects() {
        return redirects;
    },
};
