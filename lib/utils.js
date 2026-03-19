import fs from 'fs';
import RSS from 'rss';
import sharp from 'sharp';
import slugify from 'slugify';
import React from 'react';
import remarkObsidian from 'remark-obsidian';
import { renderToStaticMarkup } from 'react-dom/server';
import { Streamdown, defaultRehypePlugins } from 'streamdown';
import { rehypeUnwrapLiParagraphs } from './rehype.js';

const CONTENT_FOLDER = 'content';

export const extractFrontmatter = (markdown) => {
    const match = markdown.match(/^---\n([\s\S]+?)\n---/);
    if (!match) return {};

    return match[1].split('\n').reduce((acc, line) => {
        const [key, ...rest] = line.split(':');

        if (rest.length) {
            const value = rest.join(':').trim();

            if (value === 'true') acc[key.trim()] = true;
            else if (value === 'false') acc[key.trim()] = false;
            else acc[key.trim()] = value.replace(/^"|"$/g, '');
        }

        return acc;
    }, {});
};

export const getContentList = async () => fs.readdirSync(CONTENT_FOLDER).map((file) => {
    const content = fs.readFileSync(`${CONTENT_FOLDER}/${file}`, 'utf-8');
    const fileName = file.replace('.md', '');
    const fm = extractFrontmatter(content);

    return {
        file,
        fileName,
        title: fm.title || fileName,
        comments: fm.comments !== false,
        permalink: fm.permalink || slugify(fileName, { lower: true }),
        ...fm,
    };
});

export const resolveWikilinks = (markdown, markdownFiles) => {
    const map = Object.fromEntries(markdownFiles.map(({ file, permalink }) => [file.replace('.md', ''), permalink]));
    return markdown.replace(/(?<!!)\[\[([^\]]+)\]\]/g, (_, content) => {
        const [pageAndHeading, alias] = content.split('|');
        const [page, heading] = pageAndHeading.split('#');
        const permalink = map[page] || slugify(page, { lower: true });
        const hash = heading ? `#${slugify(heading, { lower: true })}` : '';
        const text = alias || (heading ? `${page} > ${heading}` : page);
        return `[${text}](/${permalink}${hash})`;
    });
};

export const getContent = async (permalink, contents) => {
    const list = contents || await getContentList();
    const data = list.find((content) => content.permalink === permalink || content.fileName === permalink);
    const content = fs.readFileSync(`${CONTENT_FOLDER}/${data?.file}`, 'utf-8');
    const markdown = content.replace(/^---\n[\s\S]+?\n---/, '').trim();

    return { ...data, markdown };
};

export const getArticlesPage = async () => {
    const articles = (await getContentList())
        .filter((c) => c.rss && c.datePublished)
        .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

    const grouped = articles.reduce((acc, article) => {
        const month = new Date(article.datePublished).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
        (acc[month] = acc[month] || []).push(article);
        return acc;
    }, {});

    const markdown = Object.keys(grouped).map((month) => {
        const list = grouped[month].map(({ permalink, title }) => `* [${title}](/${permalink})`).join('\n');
        return `## ${month.charAt(0).toUpperCase() + month.slice(1)}\n${list}`;
    }).join('\n\n');

    return {
        title: 'Articles',
        dateUpdated: articles[0]?.dateUpdated || null,
        datePublished: articles[0]?.datePublished || null,
        description: 'Liste de tous les articles',
        permalink: 'articles',
        comments: false,
        rss: false,
        markdown,
    };
};

export const createSitemap = async () => {
    const contentList = (await getContentList()).sort((a, b) => new Date(b.dateUpdated) - new Date(a.dateUpdated));

    const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">',
        '    <url>',
        '        <loc>https://johackim.com</loc>',
        `        <lastmod>${contentList[0].dateUpdated}</lastmod>`,
        '        <changefreq>daily</changefreq>',
        '        <priority>0.7</priority>',
        '    </url>',
        ...contentList.flatMap(({ permalink, dateUpdated }) => (dateUpdated ? [
            '    <url>',
            `        <loc>https://johackim.com/${permalink}</loc>`,
            `        <lastmod>${dateUpdated}</lastmod>`,
            '        <changefreq>daily</changefreq>',
            '        <priority>0.7</priority>',
            '    </url>',
        ] : [])),
        '</urlset>',
    ].join('\n');

    fs.writeFileSync('public/sitemap.xml', sitemap);
};

const rssClean = (Tag) => ({ node, className, ...props }) => {
    const cleaned = Object.fromEntries(Object.entries(props).filter(([k]) => !k.startsWith('data-')));
    return React.createElement(Tag, cleaned);
};

const rssTags = [
    'ol', 'li', 'ul', 'hr', 'strong', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote', 'img',
    'sup', 'sub', 'p', 'section', 'pre', 'code',
];

const rssComponents = {
    ...Object.fromEntries(rssTags.map((tag) => [tag, rssClean(tag)])),
    a: ({ href, children }) => React.createElement('a', { href }, children),
};

export const renderMarkdownToHtml = (markdown, markdownFiles) => {
    const html = renderToStaticMarkup(
        React.createElement(Streamdown, {
            rehypePlugins: [defaultRehypePlugins.raw, rehypeUnwrapLiParagraphs],
            remarkPlugins: [[remarkObsidian, { markdownFiles }]],
            components: rssComponents,
        }, markdown),
    );
    return html.replace(/<link\b[^>]*\/>/g, '').replace(/^<div[^>]*>([\s\S]*)<\/div>$/, '$1');
};

export const removeSvg = (html) => String(html).replace(/(?:<svg\b[^>]*>[\s\S]*?<\/svg>|<svg\b[^>]*\/>)/gi, '');

export const createCoverSvg = async (title, permalink) => {
    const width = 1200;
    const height = 675;
    const padding = 80;
    const maxTextWidth = width - (padding * 2);
    let fontSize = 60;

    const estWidth = String(title).length * fontSize * 0.6;
    if (estWidth > maxTextWidth) fontSize = Math.max(24, Math.floor(fontSize * (maxTextWidth / estWidth)));

    const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');

    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#111827" />
        <text
            x="${width / 2}" y="${height / 2}"
            text-anchor="middle"
            dominant-baseline="middle"
            font-family="Roboto, Arial, sans-serif"
            font-size="${fontSize}"
            fill="white"
        >${escape(title)}</text>
        <text
            x="${width - 10}" y="${height - 20}"
            font-size="25"
            text-anchor="end"
            font-family="Roboto, Arial, sans-serif"
            fill="white"
        >johackim</text>
    </svg>`;

    await sharp(Buffer.from(svg)).jpeg().toFile(`${process.cwd()}/public/covers/${permalink}.jpg`);
};

export const createRss = async () => {
    const allContents = await getContentList();
    const contents = allContents.filter(({ rss }) => rss).sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

    const feed = new RSS({
        title: 'Johackim',
        description: 'Créateur indépendant de projets open-source',
        site_url: 'https://johackim.com',
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

    const items = await Promise.all(contents.map(async ({ fileName, permalink, title, description, datePublished }) => {
        const { markdown } = await getContent(permalink || fileName, allContents);
        return { fileName, permalink, title, description, datePublished, contentHtml: renderMarkdownToHtml(markdown, allContents) };
    }));

    items.forEach(({ fileName, permalink, title, description, datePublished, contentHtml }) => {
        feed.item({
            title: title || fileName,
            guid: `https://johackim.com/${permalink}`,
            url: `https://johackim.com/${permalink}?utm_source=rss&utm_medium=rss`,
            author: 'johackim',
            description: description || '',
            ...(datePublished && { date: new Date(datePublished) }),
            custom_elements: [
                { 'media:content': { _attr: { url: `https://johackim.com/covers/${permalink}.jpg`, medium: 'image' } } },
                { 'webfeeds:featuredImage': { _attr: { url: `https://johackim.com/covers/${permalink}.jpg` } } },
                { 'content:encoded': { _cdata: removeSvg(contentHtml) } },
            ],
        });
    });

    fs.writeFileSync('public/rss.xml', feed.xml({ indent: true }));
};
