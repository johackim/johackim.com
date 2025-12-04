import fs from 'fs';
import RSS from 'rss';
import sharp from 'sharp';
import slugify from 'slugify';
import { visit } from 'unist-util-visit';
import { nodeTypes } from '@mdx-js/mdx';
import { serialize } from 'next-mdx-remote/serialize';
import remarkFrontmatter from 'remark-frontmatter';
import remarkObsidian from 'remark-obsidian';
import remarkComment from 'remark-comment';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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

export const getContentList = async () => {
    const data = fs.readdirSync(CONTENT_FOLDER).map((file) => {
        const content = fs.readFileSync(`${CONTENT_FOLDER}/${file}`, 'utf-8');
        const frontmatter = extractFrontmatter(content);

        return {
            file,
            fileName: file.replace('.md', ''),
            comments: frontmatter?.comments !== false,
            title: frontmatter?.title || file.replace('.md', ''),
            permalink: frontmatter?.permalink || slugify(file.replace('.md', ''), { lower: true }),
            ...frontmatter,
        };
    });

    return data;
};

export const getContent = async (permalink) => {
    const contents = await getContentList();
    const data = contents.find((content) => content.permalink === permalink || content.fileName === permalink);
    const markdown = fs.readFileSync(`${CONTENT_FOLDER}/${data?.file}`, 'utf-8');

    return { ...data, markdown };
};

export const getArticlesPage = async () => {
    const contentList = (await getContentList()).filter(({ rss }) => rss).sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));
    const articles = contentList
        .filter(({ datePublished }) => datePublished)
        .sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished))
        .reduce((acc, article) => {
            const month = new Date(article.datePublished).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
            if (!acc[month]) acc[month] = [];
            acc[month].push(article);

            return acc;
        }, {});

    const markdown = Object.keys(articles).map((month) => {
        const articlesInMonth = articles[month].map(({ permalink, title }) => `* [${title}](/${permalink})`).join('\n');
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
        return `## ${capitalizedMonth}\n${articlesInMonth}`;
    }).join('\n\n');

    return {
        title: 'Articles',
        dateUpdated: contentList[0]?.dateUpdated || null,
        datePublished: contentList[0]?.datePublished || null,
        description: 'Liste de tous les articles',
        permalink: 'articles',
        comments: false,
        rss: false,
        markdown,
    };
};

export const rehypeNoParagraphsInListItems = () => (tree) => {
    visit(tree, 'element', (node) => {
        if (node.tagName === 'li' && node.children) {
            // eslint-disable-next-line no-param-reassign
            node.children = node.children.flatMap((child) => {
                if (child.type === 'element' && child.tagName === 'p') {
                    return child.children;
                }
                return [child];
            });
        }
    });
};

export const compile = async (markdown) => {
    const markdownFiles = await getContentList();

    const source = await serialize(markdown, {
        parseFrontmatter: true,
        mdxOptions: {
            remarkPlugins: [
                [remarkObsidian, { markdownFiles }],
                remarkFrontmatter,
                remarkEmoji,
                remarkGfm,
                [remarkComment, { ast: true }],
                [(await import('mdx-mermaid')).default, { output: 'svg' }], // eslint-disable-line
            ],
            rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }], rehypeNoParagraphsInListItems],
        },
    });

    return source;
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

export const renderCompiledMdxToHtml = async (source) => {
    const React = await import('react');
    const { run } = await import('@mdx-js/mdx');
    const runtime = await import('react/jsx-runtime');
    const { renderToStaticMarkup } = await import('react-dom/server');

    const { default: MDXContent } = await run(source.compiledSource, { ...runtime, useMDXComponents: () => ({}) });
    const element = React.createElement(MDXContent, {});
    const html = renderToStaticMarkup(element);

    return html;
};

export const removeSvg = (html) => String(html).replace(/(?:<svg\b[^>]*>[\s\S]*?<\/svg>|<svg\b[^>]*\/>)/gi, '');

export const createCoverSvg = async (title, permalink) => {
    const width = 1200;
    const height = 675;
    const cx = width / 2;
    const cy = height / 2;

    let fontSize = 60;
    const minFont = 24;
    const padding = 80;
    const maxTextWidth = width - (padding * 2);

    const estWidth = String(title).length * fontSize * 0.6;

    if (estWidth > maxTextWidth) {
        fontSize = Math.max(minFont, Math.floor(fontSize * (maxTextWidth / estWidth)));
    }

    const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');

    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#111827" />
        <text
            x="${cx}" y="${cy}"
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
    const contents = (await getContentList()).filter(({ rss }) => rss).sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

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
        const { markdown } = await getContent(permalink || fileName);

        const source = await compile(markdown);
        const contentHtml = await renderCompiledMdxToHtml(source);

        return { fileName, permalink, title, description, datePublished, contentHtml };
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

    const rss = feed.xml({ indent: true });

    fs.writeFileSync('public/rss.xml', rss);
};
