import '@styles/globals.css';
import { useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import providers from '@lib/contexts';
import { Roboto } from 'next/font/google';
import { AppProvider } from '@johackim/design-system';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    style: ['normal'],
    subsets: ['latin'],
});

export default ({ Component, pageProps }) => {
    const getLayout = Component.getLayout || ((page) => page);

    const router = useRouter();

    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_API_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_API_HOST });

        const handleRouteChange = () => posthog.capture('$pageview');
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    const Compose = ({ components, children }) => (
        components.reduceRight((acc, Comp) => <Comp>{acc}</Comp>, children)
    );

    return (
        <ThemeProvider attribute="class">
            <Compose components={Object.values({ ...providers, AppProvider })}>
                <DefaultSeo
                    openGraph={{
                        type: 'website',
                        locale: 'fr_FR',
                        url: process.env.NEXT_PUBLIC_SITE_URL,
                        site_name: process.env.NEXT_PUBLIC_SITE_AUTHOR,
                    }}
                    twitter={{
                        handle: '@_johackim',
                        site: '@_johackim',
                        cardType: 'summary_large_image',
                    }}
                />
                { /* eslint-disable react/no-unknown-property */}
                <style jsx global>
                    {`
                        html {
                            font-family: ${roboto.style.fontFamily};
                        }
                    `}
                </style>
                {getLayout(<Component {...pageProps} />)}
            </Compose>
        </ThemeProvider>
    );
};
