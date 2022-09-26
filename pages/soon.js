import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import Sidebar from '@components/sidebar';
import DefaultLayout from '@components/defaultLayout';
import NewsletterWidget from '@components/newsletterWidget';
import Soon from '@components/soon';

const Page = () => {
    const { query } = useRouter();

    return (
        <section className="pt-20">
            <div className="container m-auto px-4 lg:max-w-screen-lg">
                <div className="lg:grid lg:grid-cols-3 lg:gap-4">
                    <div className="lg:col-span-2 lg:border dark:border-gray-800 lg:px-4 self-start">
                        { query.title && (
                            <div className="my-4 relative border dark:border-gray-800">
                                <h1 className="h-64 flex flex-col justify-center">
                                    <span className="absolute inset-0 bg-gray-100 dark:bg-gray-900 opacity-80" />
                                    <span className="transform text-center font-bold px-4 text-4xl text-gray-600 dark:text-gray-300">
                                        {query.title}
                                    </span>
                                </h1>
                            </div>
                        ) }

                        <Soon />
                    </div>

                    <Sidebar>
                        <NewsletterWidget />
                    </Sidebar>
                </div>
            </div>
        </section>
    );
};

Page.getLayout = (page) => (
    <DefaultLayout>
        <NextSeo title={page.props.title || 'Contenu bientôt disponible'} />
        {page}
    </DefaultLayout>
);

export default Page;
