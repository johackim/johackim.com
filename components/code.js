import { useState } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';

const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};

export default ({ codeString, language }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isShown, setIsShown] = useState(false);

    return (
        <Highlight {...defaultProps} code={codeString} language={language} theme={undefined}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={className}
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                    style={{
                        ...style,
                        padding: '1rem',
                        position: 'relative',
                    }}
                >
                    {isShown && (
                        <button
                            type="button"
                            className="absolute top-0 right-0 rounded-md text-xs bg-gray-300 dark:bg-gray-600 m-3 p-1.5 cursor-pointer leading-none"
                            onClick={() => {
                                copyToClipboard(codeString);
                                setIsCopied(true);
                                setTimeout(() => setIsCopied(false), 3000);
                            }}
                        >
                            {isCopied ? '🎉 Copié !' : 'Copier'}
                        </button>
                    )}

                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })} style={style}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};
