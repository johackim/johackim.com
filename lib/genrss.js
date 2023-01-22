import 'dotenv/config';

import fs from 'fs';
import RSS from 'rss';
import { runSync } from '@mdx-js/mdx';
import ReactDOMServer from 'react-dom/server';
import { MDXProvider } from '@mdx-js/react';
import { convert } from 'html-to-text';
import * as runtime from 'react/jsx-runtime';

import components from '@lib/components';
import { compileMdxToJs } from '@lib/compile';
import { getContents, getContent, removeFrontmatter } from '@lib/utils';

const convertHtmlToExcerpt = (html) => {
    const text = convert(html, { ignoreHref: true, wordwrap: false })
        .replace('Contenu archivé', '')
        .replace('Contenu en cours de création', '')
        .trim()
        .split('\n')
        .slice(0, 2)
        .join(' ')
        .trim();

    return text;
};

const removeSvg = (html) => html.replace(/<svg>?[\s\S]*<\/svg>/, '');

const convertMdToHtml = async (markdown) => {
    const code = await compileMdxToJs(markdown);
    const { default: Content } = runSync(code, runtime);

    const html = ReactDOMServer.renderToStaticMarkup(
        <MDXProvider>
            <Content components={components} />
        </MDXProvider>,
    );

    return removeSvg(html);
};

const replaceRelativeUrls = (content) => content.replace(/href="\//g, `href="${process.env.NEXT_PUBLIC_SITE_URL}/`);

export const generateRssFeed = async ({ title, description, url }) => {
    const feed = new RSS({
        title,
        description,
        site_url: url,
        generator: 'Next.js',
        custom_namespaces: {
            media: 'http://search.yahoo.com/mrss/',
            webfeeds: 'http://webfeeds.org/rss/1.0',
        },
        custom_elements: [
            { 'webfeeds:icon': 'https://johackim.com/profile.jpg' },
            { 'atom:link': { _attr: { href: 'https://johackim.com/rss.xml', rel: 'self', type: 'application/rss+xml' } } },
        ],
    });

    const contents = (await getContents())
        .filter(({ tags = [] }) => !tags?.some((tag) => ['type/moc', 'type/premium'].includes(tag)))
        .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

    for await (const content of contents) {
        const { slug, datePublished } = content;

        const markdown = removeFrontmatter((await getContent(slug)).content).trim();
        const html = await convertMdToHtml(markdown, contents);
        const excerpt = content.excerpt || convertHtmlToExcerpt(html);

        feed.item({
            title: content.title,
            guid: `${url}/${slug}`,
            url: `${url}/${slug}?utm_source=rss&utm_medium=rss`,
            author: process.env.NEXT_PUBLIC_SITE_AUTHOR,
            description: excerpt,
            date: datePublished,
            custom_elements: [
                { 'media:content': { _attr: { url: `${url}/covers/${slug}.jpg`, medium: 'image' } } },
                { 'webfeeds:featuredImage': { _attr: { url: `${url}/covers/${slug}.jpg` } } },
                { 'content:encoded': replaceRelativeUrls(html) },
            ],
        });
    }

    await fs.writeFileSync(`${process.cwd()}/public/rss.xml`, feed.xml({ indent: true }));
};
