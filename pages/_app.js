import '../styles/globals.css';
import posthog from 'posthog-js';
import { useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: ['normal'],
    subsets: ['latin'],
});

export default ({ Component, pageProps }) => {
    const router = useRouter();

    useEffect(() => {
        posthog.init('kDBqvv-5vPNiTDaYA9jSfKRC-5KhDWqhRQYAc4g3Dp8', {
            api_host: 'https://ph.johackim.com',
            advanced_disable_feature_flags: true,
        });

        const handleRouteChange = () => posthog.capture('$pageview');
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    return (
        <>
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
};
