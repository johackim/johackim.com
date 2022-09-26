import { NextSeo } from 'next-seo';
import { Article, Progress } from '@johackim/design-system';

import DefaultLayout from '@components/defaultLayout';
import Sidebar from '@components/sidebar';
import NewsletterWidget from '@components/newsletterWidget';
import { getContents, removeEmojies } from '@lib/utils';

const Page = ({ contents }) => (
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
                        <ul>
                            {contents.map((content) => (
                                <li key={content.slug}>
                                    <a href={content.slug}>{content.title}</a>
                                </li>
                            ))}
                        </ul>
                    </Article>
                </div>

                <Sidebar>
                    <NewsletterWidget />
                </Sidebar>
            </div>
        </div>
    </section>
);

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
