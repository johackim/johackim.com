import { Html, Head, Main, NextScript } from 'next/document';

export default () => (
    <Html lang="fr">
        <Head>
            <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.toggle('dark', localStorage.theme === 'dark')" }} />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);
