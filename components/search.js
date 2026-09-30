import Link from 'next/link';
import { useEffect, useState } from 'react';

const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const parseRss = (xml) => [...new DOMParser().parseFromString(xml, 'text/xml').querySelectorAll('item')].map((item) => ({
    title: item.querySelector('title').textContent,
    permalink: new URL(item.querySelector('guid').textContent).pathname.slice(1),
    content: item.textContent.replace(/<[^>]+>/g, ' '),
}));

const countMatches = (text, query) => normalize(text).split(normalize(query)).length - 1;

const findArticles = (articles, query) => articles
    .map((article) => ({ ...article, titleMatches: countMatches(article.title, query), contentMatches: countMatches(article.content, query) }))
    .filter(({ contentMatches }) => contentMatches > 0)
    .sort((a, b) => b.titleMatches - a.titleMatches || b.contentMatches - a.contentMatches);

const SearchIcon = ({ className }) => (
    <svg className={`h-5 w-5 fill-current ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2a8 8 0 0 1 6.32 12.9l5.39 5.4-1.41 1.4-5.4-5.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
    </svg>
);

const openOnCtrlK = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('search').showModal();
    }
};

const closeDialog = (event) => event.currentTarget.closest('dialog').close();

export default () => {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        window.addEventListener('keydown', openOnCtrlK, { signal: controller.signal });
        return () => controller.abort();
    }, []);

    const loadArticles = async () => !articles.length && setArticles(parseRss(await (await fetch('/rss.xml')).text()));

    const results = query ? findArticles(articles, query) : [];

    return (
        <>
            <button type="button" command="show-modal" commandfor="search" aria-label="Rechercher" title="Rechercher (Ctrl K)" className="cursor-pointer">
                <SearchIcon className="hover:text-black" />
            </button>
            <dialog id="search" closedby="any" className="mx-auto mt-20 w-[calc(100%-2rem)] max-w-xl divide-y divide-gray-100 rounded-xl bg-white shadow-2xl outline-1 outline-black/5 backdrop:bg-gray-500/25">
                <div className="grid">
                    <input
                        value={query}
                        onFocus={loadArticles}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Rechercher un article..."
                        className="col-start-1 row-start-1 h-12 pr-4 pl-11 text-gray-900 outline-none placeholder:text-gray-400"
                    />
                    <SearchIcon className="pointer-events-none col-start-1 row-start-1 ml-4 self-center text-gray-400" />
                </div>
                {results.length > 0 && (
                    <ul className="max-h-72 overflow-y-auto py-2 text-sm text-gray-800">
                        {results.map(({ title, permalink }) => (
                            <li key={permalink}>
                                <Link href={`/${permalink}`} onClick={closeDialog} className="block px-4 py-2 outline-none hover:bg-cyan-700 hover:text-white focus:bg-cyan-700 focus:text-white">{title}</Link>
                            </li>
                        ))}
                    </ul>
                )}
                {query && !results.length && <p className="p-4 text-sm text-gray-500">Aucun article trouvé.</p>}
                <Link href="/articles" onClick={closeDialog} className="block px-4 py-2 text-sm underline text-cyan-700 sm:hidden">Voir tous les articles</Link>
            </dialog>
        </>
    );
};
