import '../styles/globals.css';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: ['normal'],
    subsets: ['latin'],
});

export default ({ Component, pageProps }) => (
    <>
        <Script
            defer
            src="https://u.johackim.com/script.js"
            data-website-id="56bfd1d7-6234-47bd-96f7-44d966bb0ca4"
        />
        <DefaultSeo
            defaultTitle="Johackim - Hacker indépendant"
            titleTemplate="%s | Johackim - Hacker indépendant"
            description="Créateur indépendant de projets open-source"
            openGraph={{
                url: 'https://johackim.com',
                locale: 'fr_FR',
                site_name: 'johackim',
                type: 'website',
            }}
            twitter={{
                handle: '@_johackim',
                site: '@_johackim',
                cardType: 'summary_large_image',
            }}
        />
        {/* eslint-disable react/no-unknown-property */}
        <style jsx global>
            {`
                    html {
                        font-family: ${roboto.style.fontFamily};
                    }
                `}
        </style>
        <Component {...pageProps} />
    </>
);
