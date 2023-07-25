import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { ShareIcon } from '@heroicons/react/24/outline';
import tailwindColors from 'tailwindcss/colors';

const Graph = dynamic(() => import('@components/graph'), { ssr: false });

export default ({ links, currentNode }) => {
    const router = useRouter();
    const { resolvedTheme } = useTheme();

    const nodes = [{ id: currentNode }, ...links.map(({ title, slug }) => ({ id: title, slug }))];
    const uniqNodes = [...new Map(nodes.map((node) => [node.id, node])).values()];
    const graphLinks = links.map(({ title }) => ({ source: currentNode, target: title }));

    if (!graphLinks.length) return null;

    return (
        <div className="p-4 border dark:border-gray-800 mb-4">
            <div>
                <ShareIcon className="h-4 w-4 inline dark:text-white" />
                <span className="ml-2 align-middle">Exploration</span>
            </div>

            <hr className="dark:border-gray-800 my-2" />

            <div className="h-52 max-w-screen-xs">
                <Graph
                    nodes={uniqNodes}
                    links={graphLinks}
                    width={280}
                    height={200}
                    onNodeClick={(node) => {
                        if (node?.slug) {
                            router.push(node.slug);
                        }
                    }}
                    colors={{
                        selected: tailwindColors.gray['500'],
                        default: tailwindColors.gray['500'],
                        text: resolvedTheme === 'dark' ? tailwindColors.gray['200'] : tailwindColors.gray['800'],
                        link: resolvedTheme === 'dark' ? tailwindColors.gray['700'] : tailwindColors.gray['300'],
                        unexisting: resolvedTheme === 'dark' ? tailwindColors.gray['700'] : tailwindColors.gray['300'],
                    }}
                />
            </div>
        </div>
    );
};
