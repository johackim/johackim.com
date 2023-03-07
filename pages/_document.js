import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="fr">
            <Head />
            <body className="!block" style={{ display: 'none' }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
