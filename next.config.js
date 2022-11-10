const intercept = require('intercept-stdout');
const redirects = require('./redirects.json');

intercept((text) => (text.includes('Duplicate atom key') ? '' : text));

module.exports = {
    staticPageGenerationTimeout: 180,
    async redirects() {
        return redirects;
    },
    async rewrites() {
        return [
            {
                source: '/robots.txt',
                destination: '/api/robots',
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/robots.txt',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/plain; charset=UTF-8',
                    },
                ],
            },
        ];
    },
};
