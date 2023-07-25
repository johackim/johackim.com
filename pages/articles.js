import { NextSeo } from 'next-seo';
import { Article, Progress, Link } from '@johackim/design-system';
import styles from '@johackim/design-system/styles/article.module.css';
import Layout from '@components/layout';
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
                <div className="md:border dark:border-gray-800">
                    <Article>
                        <Article.Title className="mt-0 border-t-0 border-r-0 border-l-0">Articles</Article.Title>
                        <Article.Author className="md:px-4" author={process.env.NEXT_PUBLIC_SITE_AUTHOR} url="/a-propos" date={contents[0]?.datePublished} />
                        <Article.Content className={`${styles.article} md:px-4`}>
                            {!contents.length && <p className="text-center">Aucun article pour le moment.</p>}
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
                        </Article.Content>
                    </Article>
                </div>
            </div>
        </section>
    );
};

Page.getLayout = (page) => (
    <Layout>
        <NextSeo title="Articles" />
        <Progress />
        {page}
    </Layout>
);

export const getStaticProps = async () => {
    const contents = (await getContents())
        .map(({ title, slug, datePublished, tags }) => ({ title: removeEmojies(title), datePublished: String(datePublished), slug, tags }))
        .filter(({ tags }) => tags.includes('article'))
        .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

    return { props: { contents } };
};

export default Page;
