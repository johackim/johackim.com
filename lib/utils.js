import fs from 'fs';
import https from 'https';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import dns from 'dns';
import slugify from 'slugify';
import { registerFont, createCanvas } from 'canvas';
import canvasTxt from 'canvas-txt';
import { Client } from 'twitter-api-sdk';

import blocklist from '@lib/blocklist.json';

export const isValidEmail = (email) => new Promise((resolve) => {
    const domain = email.split('@')[1];

    if (blocklist.includes(domain)) {
        resolve(false);
    }

    dns.resolve(domain, 'MX', (err, addresses) => {
        if (err) {
            resolve(false);
        } else if (addresses && addresses.length > 0) {
            resolve(true);
        }
    });
});

export const getTwitterFollowers = async (username) => {
    const bearerToken = await fetch('https://api.twitter.com/oauth2/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${Buffer.from(`${process.env.TWITTER_API_KEY}:${process.env.TWITTER_API_SECRET_KEY}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: 'grant_type=client_credentials',
    }).then((res) => res.json()).then((json) => json.access_token);

    const client = new Client(bearerToken);
    const { data } = await client.users.findUserByUsername(username).catch(() => false);

    if (!data) return 0;

    let count = 0;

    for await (const followers of client.users.usersIdFollowers(data.id)) {
        count += followers.data.length;
    }

    return count;
};

export const getMastodonFollowers = async (accountId) => {
    const data = await fetch(`https://mastodon.ethibox.fr/api/v1/accounts/${accountId}`).then((res) => res.json());

    return data?.followers_count || 0;
};

export const getGithubFollowers = async (username) => {
    const data = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    }).then((res) => res.json());

    return data?.followers || 0;
};

export const getGithubStars = async (username) => {
    const data = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    }).then((res) => res.json());
    return (data.message ? [] : data).reduce((prev, curr) => (prev + curr.stargazers_count), 0);
};

export const getGithubRepoStars = async (repo) => {
    const data = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    }).then((res) => res.json());
    return data?.stargazers_count || 0;
};

export const getChartMogulData = async (startDate = '2020-01-01') => {
    const endDate = new Date().toISOString();

    const { summary: mrrSummary, entries } = await fetch(`https://api.chartmogul.com/v1/metrics/mrr?start-date=${startDate}&end-date=${endDate}`, {
        headers: { Authorization: `Basic ${Buffer.from(`${process.env.CHARTMOGUL_TOKEN}:${process.env.CHARTMOGUL_TOKEN}`).toString('base64')}` },
    }).then((res) => res.json()).catch(() => false);

    const { summary: arrSummary } = await fetch(`https://api.chartmogul.com/v1/metrics/arr?start-date=${startDate}&end-date=${endDate}`, {
        headers: { Authorization: `Basic ${Buffer.from(`${process.env.CHARTMOGUL_TOKEN}:${process.env.CHARTMOGUL_TOKEN}`).toString('base64')}` },
    }).then((res) => res.json()).catch(() => false);

    const currentMrr = Math.round((mrrSummary?.current || 0) / 100);
    const currentArr = Math.round((arrSummary?.current || 0) / 100);

    return { currentMrr, currentArr, entries };
};

export const getPosthogData = async () => {
    if (!process.env.POSTHOG_API_KEY) return [];

    const url = `${process.env.NEXT_PUBLIC_POSTHOG_API_HOST}/api/insight/trend/?events=[{"id":"$pageview", "math":"dau"}]&interval=day&date_from=all&filter_test_accounts=true`;
    const data = await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.POSTHOG_API_KEY}` },
    }).then((res) => res.json());

    return data.result[0].data.map((d, index) => ({ visitors: d, date: data.result[0].days[index] }));
};

export const getMailjetListSubscribers = async (contactList) => {
    const { Data } = await fetch(`https://api.mailjet.com/v3/REST/contactslist?Name=${contactList}`, {
        headers: { Authorization: `Basic ${Buffer.from(`${process.env.MAILJET_USERNAME}:${process.env.MAILJET_PASSWORD}`).toString('base64')}` },
    }).then((res) => res.json()).catch(() => false);

    const [{ SubscriberCount }] = Data || [{ SubscriberCount: 0 }];

    return SubscriberCount;
};

export const removeFrontmatter = (markdown) => markdown?.replace(/^---[\s\S]+?---/, '');

export const removeEmojies = (content) => content.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');

export const isAuth = (token, secret) => {
    try {
        if (token) {
            return jwt.verify(token, secret);
        }

        return false;
    } catch (err) {
        return false;
    }
};

export const createImage = (text, path, width = 1600, height = 900) => {
    registerFont('public/roboto.ttf', { family: 'Roboto' });

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#101827';
    ctx.fillRect(0, 0, width, height);

    canvasTxt.fontSize = 72;
    canvasTxt.fontWeight = 500;
    canvasTxt.font = 'Roboto';
    canvasTxt.align = 'center';
    canvasTxt.vAlign = 'middle';
    ctx.fillStyle = '#E5E7EB';
    canvasTxt.drawText(ctx, text, 100, canvas.height / 4, canvas.width - 200, canvas.height / 2);

    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(path, buffer);
};

export const getContents = async ({ filter } = {}) => {
    const obsidianFilePath = `${process.cwd()}/.next/cache/obsidian.json`;
    let files = fs.existsSync(obsidianFilePath) ? JSON.parse(fs.readFileSync(obsidianFilePath, 'utf8')) : [];

    const lastModifiedTime = fs.existsSync(obsidianFilePath) ? (new Date(fs.statSync(obsidianFilePath)?.mtime)).getTime() : 0;
    const expiredTime = (new Date(lastModifiedTime + 5 * 60000)).getTime();
    const currentTime = (new Date()).getTime();

    if (!fs.existsSync(obsidianFilePath) || currentTime >= expiredTime) {
        files = await fetch(`https://publish-01.obsidian.md/cache/${process.env.OBSIDIAN_SITE_ID}`)
            .then((res) => res.json()).catch(() => false);

        files = Object.entries(files).map(([key, value]) => ({
            ...value.frontmatter,
            fileName: key,
            slug: value.frontmatter?.slug || slugify(key.replace('.md', ''), { lower: true }),
            title: value.frontmatter?.title || key.replace('.md', ''),
            tags: value.frontmatter?.tags || [],
            headings: value.headings || [],
            links: value.links || [],
        }));

        const slugs = files.map(({ fileName, slug }) => ({ fileName, slug }));

        files = files.map((file) => {
            const outgoingLinks = file.links.map((l) => ({
                ...l,
                slug: slugs.find(({ fileName }) => l.link === fileName.replace('.md', ''))?.slug || `soon?title=${l.link}`,
            }));

            return { ...file, links: outgoingLinks };
        });

        files = files.map((file) => {
            const backlinks = files.filter((f) => f.links.some((l) => l.slug === file.slug))
                .map((f) => ({ link: f.fileName.replace('.md', ''), slug: f.slug }));

            const links = [...file.links, ...backlinks];

            return { ...file, links };
        });

        await fs.writeFileSync(obsidianFilePath, JSON.stringify(files));
    }

    if (filter?.tags) {
        files = files.filter(({ tags }) => tags?.some((tag) => filter.tags.includes(tag)));
    }

    if (filter?.slug) {
        files = files.filter(({ slug }) => slug === filter.slug);
    }

    return files;
};

export const getContent = async (slug = '') => {
    const [file] = await getContents({ filter: { slug } });

    const fileName = encodeURIComponent(file?.fileName);

    const content = await fetch(`https://publish-01.obsidian.md/access/${process.env.OBSIDIAN_SITE_ID}/${fileName}`, { cache: 'reload' })
        .then((res) => res.text()).catch(() => false);

    return { ...file, fileName: file.fileName.replace('.md', ''), content };
};

export const findContents = async (search) => {
    const contents = await getContents();

    return contents.filter(({ title, fileName, aliases = [] }) => {
        const filterByTitle = title.toLowerCase().match(search.toLowerCase());
        const filterByFilename = fileName.toLowerCase().match(search.toLowerCase());
        const filterByAliases = aliases.some((alias) => alias.toLowerCase().match(search.toLowerCase()));

        return filterByTitle || filterByAliases || filterByFilename;
    }).sort((a, b) => a.title.localeCompare(b.title));
};

export const download = (url, path) => {
    const file = fs.createWriteStream(path);

    https.get(url, (response) => {
        response.pipe(file);
    });
};
