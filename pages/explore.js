import { NextSeo } from 'next-seo';

import DefaultLayout from '@components/defaultLayout';
import { Link } from '@johackim/design-system';
import { getContents, removeEmojies } from '@lib/utils';

const Page = ({ mocs = [] }) => (
    <section className="mt-20 mb-10">
        <h1 className="text-center font-bold text-3xl">Explorer le hacklab</h1>
        <h2 className="text-center md:text-lg mb-8">Livres, modèles mentaux, programmation, sécuríté, etc...</h2>

        <div className="container m-auto px-4 lg:max-w-screen-lg">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/all">
                    <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                        <dt className="text-sm font-medium">📅 Tous les contenus</dt>
                        <dd className="text-sm text-gray-500">Explorez les derniers contenus</dd>
                    </div>
                </Link>

                {mocs.map(({ title, slug, excerpt }) => (
                    <Link key={slug} href={`/${slug}`}>
                        <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium">{title}</dt>
                            <dd className="text-sm text-gray-500">{excerpt}</dd>
                        </div>
                    </Link>
                ))}
            </dl>
        </div>
    </section>
);

export const getStaticProps = async () => {
    const mocs = (await getContents({ filter: { tags: 'type/moc' } }))
        .sort((a, b) => removeEmojies(a.title).localeCompare(removeEmojies(b.title)));

    return { props: { mocs } };
};

Page.getLayout = (page) => (
    <DefaultLayout className="bg-gray-100 dark:bg-gray-900">
        <NextSeo title="Explorer" />
        {page}
    </DefaultLayout>
);

export default Page;
