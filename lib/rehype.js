export const rehypeUnwrapLiParagraphs = () => (tree) => {
    const visit = (node) => {
        if (node.children) {
            node.children.forEach(visit);
            if (node.tagName === 'li') {
                // eslint-disable-next-line no-param-reassign
                node.children = node.children.flatMap((child) => (child.tagName === 'p' ? child.children : [child]));
            }
        }
    };
    visit(tree);
};
