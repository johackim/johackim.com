module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['next/babel'],
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@components': './components',
                },
            },
        ],
    ],
};
