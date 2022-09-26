import slugify from 'slugify';
import dynamic from 'next/dynamic';

import { Link, Gallery, Message } from '@johackim/design-system';
import Code from '@components/code';
import Product from '@components/product';
import Soon from '@components/soon';

const Tweet = dynamic(() => import('mdx-embed').then((component) => component.Tweet));
const Gist = dynamic(() => import('mdx-embed').then((component) => component.Tweet));

const h1 = ({ children }) => <h1 id={slugify(children, { lower: true, strict: true })}>{children}</h1>;

const h2 = ({ children }) => <h2 id={slugify(children, { lower: true, strict: true })}>{children}</h2>;

const h3 = ({ children }) => <h3 id={slugify(children, { lower: true, strict: true })}>{children}</h3>;

const a = ({ href, children, className }) => (
    /^\/soon/.test(href) ? (
        <Link
            href={`${href}?title=${encodeURIComponent(children)}`}
            className="!no-underline border-b-2 border-dotted border-gray-400"
            title="Note bientôt disponible"
        >
            {children}
        </Link>
    ) : (
        <Link href={href} className={className}>{children}</Link>
    )
);

const preToCodeBlock = (preProps) => {
    if (preProps?.children?.props?.className) {
        const { children: codeString, className = '', ...props } = preProps.children.props;

        const match = className.match(/language-([\0-\uFFFF]*)/);

        return {
            codeString: codeString?.trim() || 'none',
            className,
            language: match != null ? match[1] : '',
            ...props,
        };
    }

    return undefined;
};

const pre = (preProps) => {
    const props = preToCodeBlock(preProps);

    if (props) {
        return <Code {...props} />;
    }

    return <pre {...preProps} />;
};

export default { h1, h2, h3, a, pre, Tweet, Gist, Gallery, Message, Product, Soon };
