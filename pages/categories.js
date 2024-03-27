import { NextSeo } from 'next-seo';

import Layout from '@components/layout';
import { Link, Card } from '@johackim/design-system';
import { getContents, removeEmojies } from '@lib/utils';

const Page = ({ mocs = [] }) => (
    <section className="mt-20 mb-10">
        <h1 className="text-center font-bold text-3xl">Explorez le second cerveau d'un hacker</h1>
        <h2 className="text-center md:text-lg mb-8">Livres, modèles mentaux, programmation, sécuríté, etc...</h2>

        <div className="container m-auto px-4 lg:max-w-screen-lg">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/articles">
                    <Card small>
                        <Card.Name>📅 Tous les contenus</Card.Name>
                        <Card.Value>Explorez les derniers contenus</Card.Value>
                    </Card>
                </Link>

                {mocs.map(({ title, slug, description }) => (
                    <Link key={slug} href={`/${slug}`}>
                        <Card small>
                            <Card.Name>{title}</Card.Name>
                            <Card.Value>{description}</Card.Value>
                        </Card>
                    </Link>
                ))}
            </dl>
        </div>
    </section>
);

export const getStaticProps = async () => {
    const mocs = (await getContents())
        .filter(({ tags }) => tags?.some((tag) => tag.includes('moc')))
        .sort((a, b) => removeEmojies(a.title).localeCompare(removeEmojies(b.title)))
        .map(({ title, slug, description }) => ({ title, slug, description }));

    return { props: { mocs } };
};

Page.getLayout = (page) => (
    <Layout>
        <NextSeo title="Catégories" />
        {page}
    </Layout>
);

export default Page;
