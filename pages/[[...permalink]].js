import Link from 'next/link';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { ArticleJsonLd } from 'next-seo';
import { Streamdown, defaultRehypePlugins } from 'streamdown';
import { mermaid } from '@streamdown/mermaid';
import Layout from '../components/layout';
import Commento from '../components/commento';
import Progress from '../components/progress';
import components from '../lib/components.js';
import { getContentList, getContent, getArticlesPage, createCoverSvg } from '../lib/utils';

const INDEX_FILE = 'Start';

// eslint-disable-next-line complexity
const Page = ({ title, description, datePublished, dateUpdated, markdown, permalink, comments, isIndex }) => (
    <Layout className="lg:max-w-screen-lg m-auto px-4">
        <Head>
            {generateNextSeo({
                title: isIndex ? '' : title,
                description,
                openGraph: {
                    title,
                    description,
                    type: 'article',
                    article: {
                        ...(datePublished && { publishedTime: (new Date(datePublished)).toISOString() }),
                        ...(dateUpdated && { modifiedTime: (new Date(dateUpdated).toISOString()) }),
                    },
                    images: [{ url: `https://johackim.com/covers/${permalink}.jpg` }],
                },
            })}
        </Head>
        <Progress />
        <ArticleJsonLd
            headline={title}
            type="article"
            url={`https://johackim.com/${permalink}`}
            image={`https://johackim.com/covers/${permalink}.jpg`}
            author="Johackim"
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
                            <Link href="/a-propos" className="underline text-cyan-700">
                                johackim
                            </Link>
                        </span>
                    </>
                )}
            </div>
            <article
                className="prose break-words prose-a:font-normal prose-a:text-cyan-700 prose-a:break-words marker:text-gray-700 prose-code:font-normal prose-code:break-words prose-inline-code:px-1.5 prose-inline-code:py-0.5 prose-code:whitespace-pre-wrap prose-code:text-xs prose-code:bg-gray-200 prose-code:rounded-md prose-pre:bg-gray-200 prose-pre:text-gray-700 prose-pre:overflow-x-auto max-w-none px-0 py-4 md:p-4 prose-code:before:hidden prose-code:after:hidden prose-mark:bg-gray-300 prose-td:border-gray-300 prose-td:border prose-td:px-4 prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 [&_blockquote_.callout-title]:flex [&_blockquote_.callout-title]:gap-2"
            >
                <Streamdown
                    mode="static"
                    rehypePlugins={[defaultRehypePlugins.raw]}
                    plugins={{ mermaid }}
                >
                    {markdown}
                </Streamdown>
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

// eslint-disable-next-line complexity
export const getStaticProps = async ({ params }) => {
    const permalink = params?.permalink?.[0] ?? INDEX_FILE;

    const { markdown, ...content } = permalink === 'articles' ? await getArticlesPage() : await getContent(permalink);

    await createCoverSvg(content?.title, content?.permalink);

    const isIndex = permalink?.toLowerCase() === INDEX_FILE?.toLowerCase();

    return { props: { markdown, isIndex, ...content } };
};

export const getStaticPaths = async () => {
    const markdownFiles = await getContentList();

    const paths = markdownFiles
        .filter(({ permalink }) => permalink?.toLowerCase() !== INDEX_FILE?.toLowerCase())
        .map(({ permalink }) => ({ params: { permalink: [permalink] } }));

    paths.push({ params: { permalink: [] } });
    paths.push({ params: { permalink: ['articles'] } });

    return { paths, fallback: false };
};

export default Page;
