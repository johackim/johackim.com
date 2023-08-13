import React from 'react';
import slugify from 'slugify';
import { Link, Gallery, Message } from '@johackim/design-system';
import { Gist } from 'mdx-embed/dist/components/gist';
import { Tweet } from 'mdx-embed/dist/components/twitter';
import Code from '@components/code';

const h1 = ({ children }) => <h1 id={slugify(children, { lower: true, strict: true })}>{children}</h1>;

const h2 = ({ children }) => <h2 id={slugify(children, { lower: true, strict: true })}>{children}</h2>;

const h3 = ({ children }) => <h3 id={slugify(children, { lower: true, strict: true })}>{children}</h3>;

const a = ({ href, children, className }) => (
    /^\/soon/.test(href) ? (
        <Link
            href={href}
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

const blockquote = (props) => {
    const replaceTextInNodes = (children, text, replace) => React.Children.map(children, (child) => {
        if (typeof child === 'string') {
            return child.replace(text, replace);
        }

        if (React.isValidElement(child) && child.props.children) {
            return React.cloneElement(child, {
                children: replaceTextInNodes(child.props.children, text, replace),
            });
        }

        return child;
    });

    return <blockquote {...props}>{replaceTextInNodes(props.children, 'quote', 'Citation')}</blockquote>;
};

export default { h1, h2, h3, a, pre, blockquote, Tweet, Gist, Gallery, Message };
