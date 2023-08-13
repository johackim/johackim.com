import { useState } from 'react';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { Article, Progress } from '@johackim/design-system';
import styles from '@johackim/design-system/styles/article.module.css';
import { MDXRemote } from 'next-mdx-remote';
import { getContent, getContents, createImage, compileMdxToJs } from '@lib/utils';
import components from '@lib/components';
import Layout from '@components/layout';
import Commento from '@components/commento';
import Toc from '@components/toc';
import Graph from '@components/graphWidget';
import Newsletter from '@components/newsletterWidget';

const Page = ({ title, code, headings, links, comments, dateUpdated }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <section className="mt-20">
            <div className="container m-auto px-4 lg:max-w-screen-lg">
                <div className="grid grid-flow-col auto-cols-fr gap-4">
                    <div className="col-span-2 md:border dark:border-gray-800 relative self-start">
                        <div className="absolute right-0 m-2 z-10">
                            <button type="button" onClick={() => setOpen(!isOpen)} aria-label="menu" className="!bg-gray-200 hidden dark:!bg-gray-700 dark:hover:!bg-gray-600 rounded-md p-2 lg:inline-flex items-center justify-center text-gray-400 dark:text-gray-300 dark:hover:text-white hover:text-gray-500 hover:!bg-gray-300 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                        <Article>
                            <Article.Title className="mt-0 border-t-0 border-r-0 border-l-0">{title}</Article.Title>
                            <Article.Author className="md:px-4 mb-8" author={process.env.NEXT_PUBLIC_SITE_AUTHOR} url="/a-propos" date={dateUpdated} />
                            <Article.Content className={`${styles.article} md:px-4`}>
                                <MDXRemote {...code} components={components} />
                            </Article.Content>
                        </Article>
                        { comments && (
                            <div className="md:px-4">
                                <hr className="dark:border-gray-800 mb-4 mt-8" />
                                <Commento id={title} />
                            </div>
                        )}
                    </div>
                    {isOpen && (
                        <div className="hidden lg:block self-start sticky top-20 dark:text-gray-300 overflow-scroll h-[calc(100vh - 75px)] [&::-webkit-scrollbar]:hidden [scrollbar-width:'none']">
                            <Toc headings={headings} />
                            <Graph links={links} currentNode={title} />
                            <Newsletter />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

Page.getLayout = (page) => (
    <Layout>
        <NextSeo
            title={page.props.title}
            description={page.props.description}
            openGraph={{
                article: {
                    ...(page.props.datePublished && { publishedTime: (new Date(page.props.datePublished)).toISOString() }),
                    ...(page.props.dateUpdated && { modifiedTime: (new Date(page.props.dateUpdated).toISOString()) }),
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
            authorName={[process.env.NEXT_PUBLIC_SITE_AUTHOR]}
            publisherName={process.env.NEXT_PUBLIC_SITE_AUTHOR}
            publisherLogo={`${process.env.NEXT_PUBLIC_SITE_URL}/profile.jpg`}
            description={page.props.description}
            {...(page.props.datePublished && { datePublished: (new Date(page.props.datePublished)).toISOString() })}
            {...(page.props.dateUpdated && { dateModified: (new Date(page.props.dateUpdated).toISOString()) })}
        />
        <Progress />
        {page}
    </Layout>
);

export const getStaticProps = async ({ params }) => {
    const slug = String(params?.slug);
    const { title, description, comments, content, headings, links, dateUpdated, datePublished } = await getContent(slug);
    const code = await compileMdxToJs(content);

    createImage(title, `${process.cwd()}/public/covers/${slug}.jpg`);

    return { props: {
        code,
        title,
        links,
        comments,
        headings,
        description,
        datePublished: datePublished ? String(datePublished) : null,
        dateUpdated: dateUpdated ? String(dateUpdated) : null,
    } };
};

export const getStaticPaths = async () => {
    const contents = await getContents();
    const paths = contents.map(({ slug }) => ({ params: { slug } }));

    paths.push({ params: { slug: 'start' } });

    return { paths, fallback: false };
};

export default Page;
