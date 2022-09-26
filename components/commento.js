import { useEffect } from 'react';

const COMMENTO_SCRIPT = 'https://commento.johackim.com/js/commento.js';

const insertScript = (src, id, parentElement) => {
    const script = window.document.createElement('script');
    script.async = true;
    script.src = src;
    script.id = id;
    parentElement.appendChild(script);
    return script;
};

const removeScript = (id, parentElement) => {
    const script = window.document.getElementById(id);
    if (script) {
        parentElement.removeChild(script);
    }
};

const Commento = ({ id }) => {
    useEffect(() => {
        if (!window) {
            return false;
        }

        const { document } = window;

        if (document.getElementById('commento')) {
            insertScript(COMMENTO_SCRIPT, 'commento-script', document.body);
        }

        return () => removeScript('commento-script', document.body);
    }, [id]);

    return <div id="commento" />;
};

export default Commento;
