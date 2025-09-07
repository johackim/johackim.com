import { useEffect, useRef } from 'react';

export default ({ id }) => {
    const commentoRef = useRef(null);

    useEffect(() => {
        if (commentoRef.current) {
            commentoRef.current.innerHTML = '';
        }

        const script = document.createElement('script');
        script.src = 'https://commento.johackim.com/js/commento.js';
        script.async = true;
        script.setAttribute('data-auto-init', 'true');
        script.setAttribute('data-no-fonts', 'true');
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [id]);

    return <div id="commento" ref={commentoRef} />;
};
