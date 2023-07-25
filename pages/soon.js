import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { Link, Button, Article } from '@johackim/design-system';
import Layout from '@components/layout';

const Page = () => {
    const { query } = useRouter();

    return (
        <section className="mt-20">
            <div className="container m-auto px-4 lg:max-w-screen-lg">
                <div className="md:border dark:border-gray-800">
                    <Article>
                        <Article.Title className="!my-0 border-t-0 border-r-0 border-l-0">{query.title}</Article.Title>
                        <Article.Content>
                            <div className="p-6 lg:p-12 text-center">
                                <p className="font-bold !my-0">🚧 Ce contenu n'est pas encore disponible</p>
                                <p className="!my-0">Abonnez-vous pour être informé dès qu'il sortira... </p>
                                <Link href="/newsletter" as={Button} className="my-2 !no-underline">S'abonner</Link>
                                <p className="!my-0">
                                    <small>
                                        Ou{' '}
                                        <button type="button" onClick={() => window.history.back()} className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white underline text-sm">
                                            retourner sur la page précédente
                                        </button>
                                    </small>
                                </p>
                            </div>
                        </Article.Content>
                    </Article>
                </div>
            </div>
        </section>
    );
};

Page.getLayout = (page) => (
    <Layout>
        <NextSeo title={page.props.title || 'Contenu bientôt disponible'} />
        {page}
    </Layout>
);

export default Page;
