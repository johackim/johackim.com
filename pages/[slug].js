import { useEffect, useState } from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { runSync } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

import DefaultLayout from '@components/defaultLayout';
import { Article, Progress } from '@johackim/design-system';
import Sidebar from '@components/sidebar';
import Commento from '@components/commento';
import TocWidget from '@components/tocWidget';
import NewsletterWidget from '@components/newsletterWidget';

import components from '@lib/components';
import { compileMdxToJs } from '@lib/compile';
import { getContent, getContents, createImage } from '@lib/utils';
import { useAuth } from '@lib/atoms';

const Page = ({ title, slug, dateUpdated, code, headings, tags, isPrivate }) => {
    const auth = useAuth();
    const [privateCode, setPrivateCode] = useState(false);
    const { default: Content } = runSync(privateCode || code, runtime);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setPrivateCode(false);
        if (!isPrivate || !auth.isLoggedIn) return;

        setLoading(true);

        fetch('/api/private', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth?.user?.token}` },
            body: JSON.stringify({ slug }),
        })
            .then((res) => res.json())
            .then((data) => {
                setPrivateCode(data?.code);
                setLoading(false);
            });
    }, [slug]);

    return (
        <section className="mt-20">
            <div className="container m-auto px-4 lg:max-w-screen-lg">
                <div className="md:grid md:grid-cols-3 md:gap-4">
                    <div className="md:col-span-2 md:border dark:border-gray-800 md:px-4 self-start">
                        <Article
                            title={slug === 'start' ? '' : title}
                            dateUpdated={slug === 'start' ? '' : dateUpdated}
                            author={process.env.NEXT_PUBLIC_SITE_AUTHOR}
                            authorUrl="/a-propos"
                        >
                            {isLoading ? (
                                <p>Chargement en cours...</p>
                            ) : (
                                <Content components={components} />
                            )}
                        </Article>

                        { slug !== 'start' && !tags.includes('type/moc') && !(isPrivate && !auth.isLoggedIn) && (
                            <>
                                <hr className="dark:border-gray-800 mb-4 mt-8" />
                                <Commento />
                            </>
                        ) }
                    </div>

                    <Sidebar>
                        <TocWidget headings={headings} level={2} />
                        <NewsletterWidget />
                    </Sidebar>
                </div>
            </div>
        </section>
    );
};

Page.getLayout = (page) => (
    <DefaultLayout>
        <NextSeo
            title={page.props.title}
            description={page.props.excerpt}
            openGraph={{
                article: {
                    publishedTime: (new Date(page.props.datePublished)).toISOString(),
                    modifiedTime: (new Date(page.props.dateUpdated).toISOString()),
                },
                type: 'article',
                images: [{
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}/covers/${page.props.slug}.jpg`,
                    width: 1600,
                    height: 900,
                    alt: page.props.title,
                    type: 'image/jpeg',
                }],
            }}
        />
        <ArticleJsonLd
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/${page.props.slug}`}
            title={page.props.title}
            images={[
                `${process.env.NEXT_PUBLIC_SITE_URL}/covers/${page.props.slug}.jpg`,
            ]}
            datePublished={(new Date(page.props.datePublished)).toISOString()}
            dateModified={(new Date(page.props.dateUpdated).toISOString())}
            authorName={[process.env.NEXT_PUBLIC_SITE_AUTHOR]}
            publisherName={process.env.NEXT_PUBLIC_SITE_AUTHOR}
            publisherLogo={`${process.env.NEXT_PUBLIC_SITE_URL}/profile.jpg`}
            description={page.props.excerpt}
        />
        <Progress />
        {page}
    </DefaultLayout>
);

export const getStaticProps = async ({ params }) => {
    const { title, slug, tags, dateUpdated, datePublished, content, headings } = await getContent(params.slug);
    const code = await compileMdxToJs(content);

    createImage(title, `${process.cwd()}/public/covers/${params.slug}.jpg`);

    return { props: {
        slug,
        tags,
        title,
        headings,
        code,
        isPrivate: /<!--\s?private\s?-->/g.test(content),
        datePublished: datePublished ? String(datePublished) : null,
        dateUpdated: dateUpdated ? String(dateUpdated) : null,
    } };
};

export const getStaticPaths = async () => {
    const contents = await getContents();
    const paths = contents.map(({ slug }) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
};

export default Page;
