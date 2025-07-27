import fs from 'fs';
import { extname, basename } from 'path';
import { visit } from 'unist-util-visit';
import fetch from 'node-fetch';
import sharp from 'sharp';
import slugify from 'slugify';
import fm from 'front-matter';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkComment from 'remark-comment';
import remarkObsidian, { extractBracketLinks } from 'remark-obsidian';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { nodeTypes } from '@mdx-js/mdx';
import { serialize } from 'next-mdx-remote/serialize';

const CONTENT_FOLDER = process.env.CONTENT_FOLDER || `${process.cwd()}/content`;

const listMarkdownFiles = (folder) => {
    if (!fs.existsSync(folder)) return [];

    const files = fs.readdirSync(folder);

    return files.reduce((acc, file) => {
        const path = `${folder}/${file}`;
        const isDirectory = fs.statSync(path).isDirectory();

        if (isDirectory && !file.startsWith('.')) {
            return [...acc, ...listMarkdownFiles(path)];
        } if (extname(file) === '.md') {
            return [...acc, path];
        }

        return acc;
    }, []);
};

const titleToUrl = (title, folder = CONTENT_FOLDER) => {
    const path = `${folder}/${title}.md`;

    if (fs.existsSync(path)) {
        const markdown = fs.readFileSync(path, 'utf8');
        const frontmatter = fm(markdown).attributes;
        const slug = frontmatter?.slug || frontmatter?.permalink || slugify(title, { lower: true });

        return `/${slug}`;
    }

    return `/soon?title=${encodeURIComponent(title)}`;
};

/* eslint-disable-next-line complexity */
const extractFrontmatter = (file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const fileName = basename(file).replace('.md', '');
    const frontmatter = fm(content).attributes;
    const description = frontmatter?.description || '';
    const publish = Boolean(frontmatter?.publish);
    const comments = frontmatter?.comments !== false;
    const rss = frontmatter?.rss !== false;
    const slug = String(frontmatter?.slug || frontmatter?.permalink || slugify(fileName, { lower: true }));
    const title = frontmatter?.title || fileName;
    const tags = frontmatter?.tags || [];
    const dateUpdated = frontmatter?.dateUpdated || fs.statSync(file)?.mtime;
    const datePublished = frontmatter?.datePublished || fs.statSync(file)?.birthtime;

    return { slug, title, tags, content, comments, rss, description, dateUpdated, datePublished, publish, fileName };
};

const cache = async (fn, file = `${process.cwd()}/.next/cache/data.json`) => {
    const lastModifiedTime = fs.existsSync(file) ? (new Date(fs.statSync(file)?.mtime)).getTime() : 0;
    const expiredTime = (new Date(lastModifiedTime + 5 * 60000)).getTime();
    const currentTime = (new Date()).getTime();

    if (fs.existsSync(file) && currentTime < expiredTime) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    const data = await fn();
    fs.writeFileSync(file, JSON.stringify(data));

    return data;
};

export const getContents = async () => cache(async () => {
    let files = listMarkdownFiles(CONTENT_FOLDER);

    files = files.map((file) => extractFrontmatter(file));

    files = files.map((file) => {
        const lines = file?.content.split('\n');
        const headings = lines.filter((line) => line.startsWith('## '))
            .map((h) => {
                const heading = h.replace('## ', '');
                const id = slugify(heading, { lower: true, strict: true });
                return { id, heading };
            });

        return { ...file, headings };
    });

    files = files.map((file) => {
        const links = extractBracketLinks(file.content, titleToUrl);
        return { ...file, links };
    });

    files = files.map((file) => {
        const backlinks = files.filter(({ links }) => links.some(({ slug }) => slug === file.slug))
            .map(({ slug, title }) => ({ slug, title }));

        return { ...file, links: [...file.links, ...backlinks] };
    });

    files = files.filter((file) => {
        const datePublished = new Date(new Date(file.datePublished).toISOString().replace('Z', '+02:00'));
        return datePublished <= new Date();
    });

    return files;
});

export const getContent = async (slug) => {
    const contents = await getContents();
    const content = contents.find((item) => item.slug === slug);

    return content || {};
};

export const rehypeNoParagraphsInListItems = () => (tree) => {
    visit(tree, 'element', (node) => {
        if (node.tagName === 'li' && node.children) {
            node.children = node.children.flatMap((child) => {
                if (child.type === 'element' && child.tagName === 'p') {
                    return child.children;
                }
                return [child];
            });
        }
    });
};

export const compileMdxToJs = async (content) => {
    const code = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                [remarkObsidian, { titleToUrl, markdownFolder: CONTENT_FOLDER }],
                remarkFrontmatter,
                remarkMdxFrontmatter,
                remarkEmoji,
                remarkGfm,
                [remarkComment, { ast: true }],
                [(await import('mdx-mermaid')).default, { output: 'svg' }], // eslint-disable-line
            ],
            rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }], rehypeNoParagraphsInListItems],
        },
    });

    return code;
};

export const createImage = async (text, path) => {
    if (fs.existsSync(path)) return;

    const fontSize = 50;
    const lineHeight = 60;
    const width = 1200;
    const height = 675;
    const maxLineLength = (width * 0.8) / (fontSize / 2);

    const lines = [];
    let line = '';

    text.split(' ').forEach((word) => {
        if ((line + word).length > maxLineLength) {
            lines.push(line);
            line = word;
        } else {
            line += ` ${word}`;
        }
    });

    lines.push(line.trim());

    const startY = (height - (lines.length - 1) * lineHeight) / 2;

    const svgLines = lines.map((l, i) => `<text x="600" y="${startY + i * lineHeight}" fill="white" text-anchor="middle" font-weight="500" font-family="Roboto" font-size="${fontSize}">${l}</text>`).join('\n');

    const svgUserTag = `<text x="${width - 10}" y="${height - 10}" fill="white" text-anchor="end" font-family="Roboto" font-weight="bold" font-size="12">@johackim</text>`;

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <rect width="100%" height="100%" fill="#111727" />
            ${svgLines}
            ${svgUserTag}
        </svg>
    `;

    await sharp(Buffer.from(svg)).jpeg().toFile(path);
};

export const getChartMogulData = async (type = 'mrr', startDate = '2010-01-01') => {
    const endDate = new Date().toISOString();
    const url = `https://api.chartmogul.com/v1/metrics/${type}?start-date=${startDate}&end-date=${endDate}`;
    const authorization = Buffer.from(`${process.env.CHARTMOGUL_TOKEN}:${process.env.CHARTMOGUL_TOKEN}`).toString('base64');

    const { summary, entries } = await fetch(url, {
        headers: { Authorization: `Basic ${authorization}` },
    }).then((res) => res.json()).catch(() => false);

    const current = Math.round((summary?.current || 0) / 100);

    return type === 'mrr' ? { mrr: current, entries } : { arr: current, entries };
};

export const getPosthogData = async () => {
    if (!process.env.POSTHOG_API_KEY) return [];

    const url = 'https://ph.johackim.com/api/insight/trend/?events=[{"id":"$pageview", "math":"dau"}]&interval=day&date_from=all&filter_test_accounts=true';
    const data = await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.POSTHOG_API_KEY}` },
    }).then((res) => res.json());

    return data.result[0].data.map((d, index) => ({ visitors: d, date: data.result[0].days[index] }));
};

export const getGithubStars = async (username) => {
    const data = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: {
            Authorization: `token ${process.env.GH_TOKEN}`,
        },
    }).then((res) => res.json());

    return (data.message ? [] : data).reduce((prev, curr) => (prev + curr.stargazers_count), 0);
};

export const getGithubFollowers = async (username) => {
    const data = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `token ${process.env.GH_TOKEN}`,
        },
    }).then((res) => res.json());

    return data?.followers || 0;
};

export const getMastodonFollowers = async (accountId) => {
    const data = await fetch(`https://mastodon.ethibox.fr/api/v1/accounts/${accountId}`).then((res) => res.json());

    return data?.followers_count || 0;
};

export const getTwitterFollowers = async (username) => {
    const data = await fetch('https://n8n.ethibox.fr/webhook/7b89a655-3752-4b84-838c-6792dcb0970b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    }).then((res) => res.json());

    return data?.followers || 0;
};

export const removeFrontmatter = (markdown) => markdown?.replace(/^---[\s\S]+?---/, '');

export const removeEmojies = (content) => content.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');

export const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
