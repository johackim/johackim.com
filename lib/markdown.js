import { visit } from 'unist-util-visit';
import { defaultRemarkPlugins, defaultRehypePlugins } from 'streamdown';

const rehypeNoParagraphsInListItems = () => (tree) => {
    visit(tree, 'element', (node) => {
        if (node.tagName === 'li' && node.children) {
            // eslint-disable-next-line no-param-reassign
            node.children = node.children.flatMap((child) => ((child.type === 'element' && child.tagName === 'p') ? child.children : [child]));
        }
    });
};

const tags = ['p', 'a', 'strong', 'img', 'pre', 'blockquote', 'hr', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'sup', 'sub', 'section'];

export default {
    mode: 'static',
    prefix: 'sd',
    controls: false,
    components: Object.fromEntries(tags.map((tag) => [tag, tag])),
    remarkPlugins: [defaultRemarkPlugins.gfm],
    rehypePlugins: [defaultRehypePlugins.raw, rehypeNoParagraphsInListItems],
};
