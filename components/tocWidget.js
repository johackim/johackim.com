import { useEffect, useState } from 'react';
import slugify from 'slugify';
import { Link } from '@johackim/design-system';

const TocWidget = ({ level, className, ...props }) => {
    if (props?.headings.length === 0) return false;

    const firstHeading = props.headings[0].heading;
    const headings = level ? props.headings.filter((h) => h.level <= level) : props.headings;
    const [currentHeading, setHeading] = useState(slugify(firstHeading, { lower: true, strict: true }));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '0% 0% -80% 0%' },
        );

        headings.forEach(({ heading }) => {
            const id = slugify(heading, { lower: true, strict: true });
            const element = document.getElementById(id);

            if (element) {
                observer.observe(element);
            }
        });
    }, [headings]);

    return (
        <div className={`p-4 border dark:border-gray-800 mb-4 ${className}`}>
            <div>
                <svg className="h-4 w-4 inline fill-current dark:text-white" viewBox="0 0 100 100"><path d="M16.4,16.4c-3.5,0-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4S19.9,16.4,16.4,16.4z M16.4,19.6 c1.8,0,3.2,1.4,3.2,3.2c0,1.8-1.4,3.2-3.2,3.2s-3.2-1.4-3.2-3.2C13.2,21,14.6,19.6,16.4,19.6z M29.2,21.2v3.2H90v-3.2H29.2z M16.4,43.6c-3.5,0-6.4,2.9-6.4,6.4s2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4S19.9,43.6,16.4,43.6z M16.4,46.8c1.8,0,3.2,1.4,3.2,3.2 s-1.4,3.2-3.2,3.2s-3.2-1.4-3.2-3.2S14.6,46.8,16.4,46.8z M29.2,48.4v3.2H90v-3.2H29.2z M16.4,70.8c-3.5,0-6.4,2.9-6.4,6.4 c0,3.5,2.9,6.4,6.4,6.4s6.4-2.9,6.4-6.4C22.8,73.7,19.9,70.8,16.4,70.8z M16.4,74c1.8,0,3.2,1.4,3.2,3.2c0,1.8-1.4,3.2-3.2,3.2 s-3.2-1.4-3.2-3.2C13.2,75.4,14.6,74,16.4,74z M29.2,75.6v3.2H90v-3.2H29.2z" /></svg>
                <span className="ml-2 align-middle">Table des matières</span>
            </div>

            <hr className="dark:border-gray-800 my-2" />

            <ul className="text-sm my-4">
                { headings.map(({ heading }) => {
                    const id = slugify(heading, { lower: true, strict: true });

                    return (
                        <li role="presentation" key={heading} className="my-1" onClick={() => setHeading(id)}>
                            <Link
                                href={`#${id}`}
                                title={heading}
                                className={currentHeading === id && 'text-gray-900 dark:text-white font-bold'}
                            >
                                {heading}
                            </Link>
                        </li>
                    );
                }) }
            </ul>
        </div>
    );
};

TocWidget.defaultProps = {
    headings: ['Heading 1', 'Heading 2', 'Heading 3'],
    className: '',
};

export default TocWidget;
