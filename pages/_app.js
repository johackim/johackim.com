import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';

import '@styles/globals.css';

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

    return (
        <ThemeProvider attribute="class">
            <RecoilRoot>
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
                {getLayout(<Component {...pageProps} />)}
            </RecoilRoot>
        </ThemeProvider>
    );
};