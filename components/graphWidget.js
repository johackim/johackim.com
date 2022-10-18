import dynamic from 'next/dynamic';
import { ShareIcon } from '@heroicons/react/outline';

const Graph = dynamic(() => import('@components/graph'), { ssr: false });

export default ({ links, currentNode }) => (
    <div className="p-4 border dark:border-gray-800 mb-4">
        <div>
            <ShareIcon className="h-4 w-4 inline dark:text-white" />
            <span className="ml-2 align-middle">Exploration</span>
        </div>

        <hr className="dark:border-gray-800 my-2" />

        <div className="h-52">
            <Graph
                nodes={[{ id: currentNode }, ...links.map(({ link }) => ({ id: link }))]}
                links={links.map(({ link }) => ({ source: currentNode, target: link }))}
                width={600}
                height={200}
                colors={{
                    text: '#1f2937',
                    default: '#7B7D8C',
                    link: '#CBD5E1',
                    selected: '#7B6DD6',
                }}
            />
        </div>
    </div>
);
