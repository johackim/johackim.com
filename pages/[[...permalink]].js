import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import Layout from '../components/layout';
import Commento from '../components/commento';
import Code from '../components/code';
import Progress from '../components/progress';
import { getContentList, getContent, getOptions, getArticlesPage, createCoverSvg, compile } from '../lib/utils';

const components = {
    pre: Code,
    a: ({ href, title, children, className = '' }) => {
        if (className.includes('not-found')) {
            return (
                <Link
                    title="Note bientôt disponible"
                    href={`/soon?title=${encodeURIComponent(title)}`}
                    className="!no-underline border-b-2 border-dotted border-gray-400"
                >
                    {children}
                </Link>
            );
        }

        if (/^https?:\/\//.test(href)) {
            return <Link href={href} className={className} target="_blank">{children}</Link>;
        }

        return <Link href={href} className={className}>{children}</Link>;
    },
};

// eslint-disable-next-line complexity
const Page = ({ title, description, datePublished, dateUpdated, source, permalink, comments, isIndex }) => (
    <Layout className="lg:max-w-screen-lg m-auto px-4">
        <Progress />
        <NextSeo
            title={isIndex ? '' : title}
            description={description}
            openGraph={{
                title,
                description,
                type: 'article',
                article: {
                    ...(datePublished && { publishedTime: (new Date(datePublished)).toISOString() }),
                    ...(dateUpdated && { modifiedTime: (new Date(dateUpdated).toISOString()) }),
                },
                images: [{ url: `https://johackim.com/covers/${permalink}.jpg` }],
            }}
        />
        <ArticleJsonLd
            title={title}
            type="article"
            url={`https://johackim.com/${permalink}`}
            images={[`https://johackim.com/covers/${permalink}.jpg`]}
            authorName="Johackim"
            description={description}
            {...(datePublished && { datePublished: (new Date(datePublished)).toISOString() })}
            {...(dateUpdated && { dateModified: (new Date(dateUpdated).toISOString()) })}
        />
        <div className="md:border md:border-gray-200 mt-20">
            <h1 className="h-64 flex flex-col justify-center relative border-b border-gray-200">
                <span className="absolute inset-0 bg-gray-100 opacity-80 z-10" />
                <span className="transform text-center font-bold px-4 text-4xl text-gray-600 break-words z-20">{title}</span>
            </h1>
            <div className="text-xs my-4 md:px-4 text-gray-700">
                {dateUpdated && (
                    <>
                        <span>Mis à jour le&nbsp;</span>
                        <span>{new Date(dateUpdated).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>
                            &nbsp;par&nbsp;
                            <Link href="/a-propos" className="underline">
                                johackim
                            </Link>
                        </span>
                    </>
                )}
            </div>
            <article className="prose break-words prose-a:font-normal prose-a:break-words marker:text-gray-700 prose-code:font-normal prose-code:break-words prose-inline-code:px-1.5 prose-inline-code:py-0.5 prose-code:whitespace-pre-wrap prose-code:text-xs prose-code:bg-gray-200 prose-code:rounded-md prose-pre:bg-gray-200 prose-pre:text-gray-700 prose-pre:overflow-x-auto max-w-none px-0 py-4 md:p-4 prose-code:before:hidden prose-code:after:hidden">
                <MDXRemote {...source} components={components} />
            </article>
            {comments && (
                <div className="md:px-4">
                    <hr className="border-gray-200 mb-4 mt-8" />
                    <Commento id={permalink} />
                </div>
            )}
        </div>
    </Layout>
);

export const getStaticProps = async ({ params }) => {
    const { indexFile } = await getOptions();

    const permalink = params?.permalink?.[0] ?? indexFile;

    const { markdown, ...content } = permalink === 'articles' ? await getArticlesPage() : await getContent(permalink);

    const source = await compile(markdown);

    await createCoverSvg(content?.title, content?.permalink);

    const isIndex = permalink.toLowerCase() === indexFile.toLowerCase();

    return { props: { source, isIndex, ...content } };
};

export const getStaticPaths = async () => {
    const { indexFile } = await getOptions();

    const markdownFiles = await getContentList();

    const paths = markdownFiles
        .filter(({ permalink }) => permalink.toLowerCase() !== indexFile.toLowerCase())
        .map(({ permalink }) => ({ params: { permalink: [permalink] } }));

    paths.push({ params: { permalink: [] } });
    paths.push({ params: { permalink: ['articles'] } });

    return { paths, fallback: false };
};

export default Page;
