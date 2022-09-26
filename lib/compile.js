import ReactDOMServer from 'react-dom/server';
import remarkFrontmatter from 'remark-frontmatter';
import remarkComment from 'remark-comment';
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter';
import remarkObsidian from 'remark-obsidian';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import slugify from 'slugify';
import { nodeTypes, compile } from '@mdx-js/mdx';
import { getContent, getContents } from '@lib/utils';
import Reserved from '@components/reserved';

export const compileMdxToJs = async (content) => {
    const contents = await getContents();

    const titleToUrl = (title) => {
        const fileName = `${title}.md`;
        const file = contents.find((f) => f.fileName === fileName);

        if (file) {
            const slug = file.slug || slugify(title, { lower: true });

            return `/${slug}`;
        }

        return '/soon';
    };

    const EMBED_LINK_REGEX = /!\[\[([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)\]\]/g;

    const embedLinks = await Promise.all((content?.match(EMBED_LINK_REGEX) || []).map(async (embedLink) => {
        const fileName = `${embedLink.replace(/!\[\[|\]\]/g, '')}.md`;
        const file = await contents.find((f) => f.fileName === fileName);

        if (file) {
            const slug = file.slug || slugify(fileName, { lower: true });
            const markdown = (await getContent(slug)).content;

            return { fileName, markdown };
        }

        return false;
    }));

    const fetchEmbedContent = (fileName) => {
        const file = embedLinks.find((f) => f.fileName === `${fileName}.md`);
        return file?.markdown ? file.markdown : false;
    };

    const paywall = ReactDOMServer.renderToStaticMarkup(<Reserved />);

    const code = String(await compile(content, {
        outputFormat: 'function-body',
        remarkPlugins: [
            [remarkObsidian, { titleToUrl, fetchEmbedContent, paywall }],
            remarkFrontmatter,
            remarkMdxFrontmatter,
            remarkEmoji,
            remarkGfm,
            [remarkComment, { ast: true }],
            [(await import('mdx-mermaid')).default, { output: 'svg' }], // eslint-disable-line
        ],
        rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
    }));

    return code;
};
