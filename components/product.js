import slugify from 'slugify';

import { Button } from '@johackim/design-system';

const Product = ({ title, subtitle, benefits, lastLine, className, tags = [], ...props }) => {
    const slug = props.slug || slugify(title, { lower: true });

    return (
        <div className={`dark:bg-gray-800 dark:text-gray-300 overflow-hidden border dark:border-gray-800 rounded-lg ${className}`}>
            <div className="px-4 py-5 sm:p-6">
                <h1 className="text-3xl font-medium leading-tight mx-auto">{title}</h1>

                <div className="mt-1 mb-4 grid gap-1 grid-flow-col auto-cols-max">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md text-xs font-medium leading-4 bg-gray-200 dark:bg-gray-500 dark:text-gray-900">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="font-bold">{subtitle}</p>

                <ul className="list-disc list-inside ml-4 my-4">
                    {benefits.map((benefit) => (
                        <li key={benefit} className="my-2">
                            {benefit}
                        </li>
                    ))}
                </ul>

                {lastLine && <p>{lastLine}</p>}

                <div className="mt-6">
                    <Button href={`/${slug}`} className="w-full md:w-auto">
                        <span>Accéder à cette ressource</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

Product.defaultProps = {
    title: 'Product Title',
    subtitle: 'Product Subtitle',
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
    tags: ['tag1', 'tag2'],
    lastLine: '',
    className: '',
};

export default Product;
