import Link from 'next/link';
import Code from '../components/code';

const clean = (Tag) => ({ node, ...props }) => <Tag {...props} />;

const streamdownTags = [
    'ol', 'li', 'ul', 'hr', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'table', 'thead', 'tbody', 'tr', 'th', 'td', 'blockquote', 'code', 'img',
    'pre', 'sup', 'sub', 'p', 'section',
];

const cleanComponents = Object.fromEntries(streamdownTags.map((tag) => [tag, clean(tag)]));

const components = {
    ...cleanComponents,
    pre: ({ node, children, ...rest }) => (
        <Code {...rest}>{children}</Code>
    ),
    a: ({ href, title, children, className = '' }) => {
        if (className && className.includes('not-found')) {
            return (
                <Link
                    title="Note bientôt disponible"
                    href={`/soon?title=${encodeURIComponent(title)}`}
                    className="!no-underline border-b-2 border-dotted border-cyan-700"
                >
                    {children}
                </Link>
            );
        }

        if (/^https?:\/\//.test(href)) {
            return <Link href={href} className={className} target="_blank">{children}</Link>;
        }

        return <Link href={href} className={className}>{children}</Link>;
    },
};

export default components;
