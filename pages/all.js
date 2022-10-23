import { NextSeo } from 'next-seo';
import { Article, Progress, Link } from '@johackim/design-system';

import DefaultLayout from '@components/defaultLayout';
import Sidebar from '@components/sidebar';
import NewsletterWidget from '@components/newsletterWidget';
import { getContents, removeEmojies } from '@lib/utils';

const Page = ({ contents }) => {
    const groupedContents = contents.reduce((acc, content) => {
        const date = new Date(content.datePublished);
        const month = date.toLocaleString('fr-FR', { month: 'long' });
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(content);

        return acc;
    }, {});

    return (
        <section className="mt-20">
            <div className="container m-auto px-4 lg:max-w-screen-lg">
                <div className="md:grid md:grid-cols-3 md:gap-4">
                    <div className="md:col-span-2 md:border dark:border-gray-800 md:px-4 self-start">
                        <Article
                            title="Tous les contenus"
                            dateUpdated={contents[0].datePublished}
                            author={process.env.NEXT_PUBLIC_SITE_AUTHOR}
                            authorUrl="/a-propos"
                        >
                            {Object.keys(groupedContents).map((key) => (
                                <div key={key}>
                                    <h2 className="text-2xl font-bold mb-4 capitalize">{key}</h2>

                                    <ul className="list-disc list-inside">
                                        {groupedContents[key].map(({ title, slug }) => (
                                            <li key={slug}>
                                                <Link href={slug}>{title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </Article>
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
        <NextSeo title="Tous les contenus" />
        <Progress />
        {page}
    </DefaultLayout>
);

export const getStaticProps = async () => {
    const contents = (await getContents())
        .map(({ title, slug, datePublished, tags }) => ({ title: removeEmojies(title), slug, datePublished: String(datePublished), tags }))
        .filter(({ tags }) => !tags?.some((tag) => ['type/moc', 'type/premium'].includes(tag)))
        .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

    return { props: { contents } };
};

export default Page;
