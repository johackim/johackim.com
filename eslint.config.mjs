import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import importPlugin, { createNodeResolver } from 'eslint-plugin-import-x';
import airbnb from './eslint.airbnb.json' with { type: 'json' };

export default [
    { ignores: ['.next/', 'out/'] },
    {
        plugins: {
            '@stylistic': stylistic,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        settings: {
            'import-x/resolver-next': [createNodeResolver()],
        },
        rules: {
            ...airbnb,
            '@stylistic/indent': [2, 4, { SwitchCase: 1 }],
            '@stylistic/jsx-indent-props': [2, 4],
            '@stylistic/max-len': [0],
            '@stylistic/object-curly-newline': [0],
            'import/extensions': [0],
            'import/no-extraneous-dependencies': [0],
            'import/prefer-default-export': [0],
            'no-restricted-syntax': [0],
            complexity: [2, 7],
            'max-depth': [2, 2],
        },
    },
];
