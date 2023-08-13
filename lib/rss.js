import 'dotenv/config';

import fs from 'fs';
import RSS from 'rss';
import ReactDOMServer from 'react-dom/server';
import { MDXRemote } from 'next-mdx-remote';

import components from '@lib/components';
import { getContents, getContent, compileMdxToJs, removeFrontmatter, ucFirst } from '@lib/utils';

const removeSvg = (html) => html.replace(/<svg>?[\s\S]*<\/svg>/, '');

const convertMdToHtml = async (markdown) => {
    const code = await compileMdxToJs(markdown);

    const html = ReactDOMServer.renderToStaticMarkup(
        <MDXRemote {...code} components={components} />,
    );

    return removeSvg(html);
};

const replaceRelativeUrls = (content) => content.replace(/href="\//g, `href="${process.env.NEXT_PUBLIC_SITE_URL}/`);

const generateRssFeed = async (contents, output = 'rss.xml') => {
    const url = process.env.NEXT_PUBLIC_SITE_URL;

    const feed = new RSS({
        title: ucFirst(process.env.NEXT_PUBLIC_SITE_AUTHOR),
        description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
        site_url: url,
        generator: 'Next.js',
        custom_namespaces: {
            media: 'http://search.yahoo.com/mrss/',
            webfeeds: 'http://webfeeds.org/rss/1.0',
        },
        custom_elements: [
            { 'webfeeds:icon': 'https://johackim.com/profile.jpg' },
            { 'atom:link': { _attr: { href: `https://johackim.com/${output}`, rel: 'self', type: 'application/rss+xml' } } },
        ],
    });

    for await (const content of contents) {
        const { slug, datePublished } = content;

        const markdown = removeFrontmatter((await getContent(slug)).content).trim();
        const html = await convertMdToHtml(markdown);
        const description = content.description || '';

        feed.item({
            title: content.title,
            guid: `${url}/${slug}`,
            url: `${url}/${slug}?utm_source=rss&utm_medium=rss`,
            author: process.env.NEXT_PUBLIC_SITE_AUTHOR,
            date: datePublished,
            description,
            custom_elements: [
                { 'media:content': { _attr: { url: `${url}/covers/${slug}.jpg`, medium: 'image' } } },
                { 'webfeeds:featuredImage': { _attr: { url: `${url}/covers/${slug}.jpg` } } },
                { 'content:encoded': replaceRelativeUrls(html) },
            ],
        });
    }

    await fs.writeFileSync(`${process.cwd()}/public/${output}`, feed.xml({ indent: true }));
};

export const generateRssFeeds = async () => {
    const contents = (await getContents()).sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
    const tags = [...new Set(contents.flatMap((content) => content.tags))];

    for await (const tag of tags) {
        const contentsByTag = contents.filter((content) => content.tags.includes(tag));
        await generateRssFeed(contentsByTag, `${tag}.xml`);
    }

    const contentsFiltered = contents.filter(({ rss }) => rss);
    await generateRssFeed(contentsFiltered);
};
