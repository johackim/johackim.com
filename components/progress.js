import { useState, useEffect } from 'react';

const getScrollPercent = ({ scrollTop, scrollHeight, clientHeight }) => (scrollTop / (scrollHeight - clientHeight)) * 100;

export default () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => setProgress(getScrollPercent(document.documentElement));

        updateProgress();
        document.addEventListener('scroll', updateProgress);
        return () => document.removeEventListener('scroll', updateProgress);
    }, []);

    return <div className="bg-cyan-600 h-1 z-30 fixed inset-0" style={{ width: `${progress}%` }} />;
};
