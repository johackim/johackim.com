import { useRef, useState } from 'react';

export default ({ children }) => {
    const preRef = useRef(null);
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        if (preRef.current) {
            const code = preRef.current.innerText.trim();
            navigator.clipboard.writeText(code).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <div className="relative group">
            <button
                type="button"
                className="invisible group-hover:visible absolute top-0 right-0 rounded-md text-xs bg-gray-300 m-3 p-1.5 cursor-pointer leading-none"
                onClick={handleClick}
            >
                {copied ? '🎉 Copié !' : 'Copier'}
            </button>
            <pre ref={preRef}>{children}</pre>
        </div>
    );
};
