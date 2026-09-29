import fs from 'fs';
import { getContentList, getArticlesPage } from './utils.js';

const CONTENT_FOLDER = 'content';

const INDEX_FILE = '202104091703';

const extractWikilinks = (markdown) => [...markdown
    .replace(/```[\s\S]*?```|`[^`\n]*`/g, '')
    .matchAll(/(?<!!)\[\[([^\]|#^]+)/g)]
    .map(([, target]) => target.trim())
    .filter(Boolean);

const uniqueLinks = (links) => [...new Map(links.map((link) => [[link.source, link.target].sort().join('\n'), link])).values()];

const toGraphNode = (id, content) => ({
    id,
    title: content?.title ?? id,
    href: content ? `/${content.fileName === INDEX_FILE ? '' : content.permalink}` : `/soon?title=${encodeURIComponent(id)}`,
    isUnresolved: !content,
});

export const getGraph = async () => {
    const contents = new Map((await getContentList()).map((content) => [content.fileName, content]));

    const links = uniqueLinks([...contents.values()].flatMap(({ file, fileName }) => extractWikilinks(fs.readFileSync(`${CONTENT_FOLDER}/${file}`, 'utf-8'))
        .map((target) => ({ source: fileName, target }))
        .filter(({ source, target }) => source !== target)));

    const ids = [...new Set([...contents.keys(), ...links.map(({ target }) => target)])];

    return { nodes: ids.map((id) => toGraphNode(id, contents.get(id))), links };
};

export const getLocalGraph = async (id) => {
    const { nodes, links } = await getGraph();
    const articlesMarkdown = id === 'articles' ? (await getArticlesPage()).markdown : '';
    const linkedIds = new Set(links.filter(({ source, target }) => source === id || target === id).flatMap(({ source, target }) => [source, target]));
    const localNodes = nodes.filter((node) => (linkedIds.has(node.id) || articlesMarkdown.includes(`(${node.href})`)) && !node.isUnresolved);
    const localIds = new Set(localNodes.map((node) => node.id));

    return { nodes: localNodes, links: links.filter(({ source, target }) => localIds.has(source) && localIds.has(target)), activeId: id ?? null };
};
