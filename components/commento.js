import { useEffect } from 'react';

const COMMENTO_SCRIPT = 'https://commento.johackim.com/js/commento.js';

const insertScript = (src, id, parentElement) => {
    const script = window.document.createElement('script');
    script.async = true;
    script.src = src;
    script.id = id;
    script.setAttribute('data-auto-init', 'true');
    script.setAttribute('data-no-fonts', 'true');
    parentElement.appendChild(script);
    return script;
};

const removeScript = (id, parentElement) => {
    const script = window.document.getElementById(id);
    if (script) {
        parentElement.removeChild(script);
    }
};

export default ({ id }) => {
    useEffect(() => {
        if (!window) return () => {};

        const { document } = window;

        if (document.getElementById('commento')) {
            insertScript(COMMENTO_SCRIPT, 'commento-script', document.body);
        }

        return () => removeScript('commento-script', document.body);
    }, [id]);

    return <div id="commento" />;
};
