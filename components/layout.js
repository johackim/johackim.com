import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Header, Footer, Link, Button, Switch } from '@johackim/design-system';

const Layout = ({ children, size = 'lg', className = '' }) => {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <>
            <Header
                description={process.env.NEXT_PUBLIC_SITE_TITLE}
                logo="/profile.jpg"
                title={ucFirst(process.env.NEXT_PUBLIC_SITE_AUTHOR)}
                size={size}
                fixed
            >
                <Link href="/start" active={router.asPath === '/start'}>Accueil</Link>
                <Link href="/articles" active={router.asPath === '/articles'}>Articles</Link>
                <Link href="/categories" active={router.asPath === '/categories'}>Catégories</Link>
                <Link href="/newsletter" as={Button} className="!py-1 !px-3" secondary>S'abonner</Link>
                <Switch
                    key="switch"
                    className="!hidden lg:!inline-flex"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    icons={[
                        <SunIcon className="bg-white h-3 w-3 text-gray-900" />,
                        <MoonIcon className="bg-white h-3 w-3 text-gray-900" />,
                    ]}
                />
            </Header>

            <main className={className}>{children}</main>

            <Footer startYear="2017" size={size} copyleft>
                <a href="https://twitter.com/_johackim" aria-label="X">
                    <svg className="h-5 w-5 fill-current hover:text-black dark:hover:text-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                </a>
                <a href="https://t.me/johackim" aria-label="Telegram">
                    <svg className="h-5 w-5 fill-current hover:text-black dark:hover:text-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                </a>
                <a href="https://mastodon.ethibox.fr/@johackim" aria-label="Mastodon" rel="me"> {/* eslint-disable-line react/no-invalid-html-attribute */}
                    <svg className="h-5 w-5 fill-current hover:text-black dark:hover:text-white" aria-hidden="true" data-prefix="fab" data-icon="mastodon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M433 179.11c0-97.2-63.71-125.7-63.71-125.7-62.52-28.7-228.56-28.4-290.48 0 0 0-63.72 28.5-63.72 125.7 0 115.7-6.6 259.4 105.63 289.1 40.51 10.7 75.32 13 103.33 11.4 50.81-2.8 79.32-18.1 79.32-18.1l-1.7-36.9s-36.31 11.4-77.12 10.1c-40.41-1.4-83-4.4-89.63-54a102.54 102.54 0 0 1-.9-13.9c85.63 20.9 158.65 9.1 178.75 6.7 56.12-6.7 105-41.3 111.23-72.9 9.8-49.8 9-121.5 9-121.5zm-75.12 125.2h-46.63v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.33V197c0-58.5-64-56.6-64-6.9v114.2H90.19c0-122.1-5.2-147.9 18.41-175 25.9-28.9 79.82-30.8 103.83 6.1l11.6 19.5 11.6-19.5c24.11-37.1 78.12-34.8 103.83-6.1 23.71 27.3 18.4 53 18.4 175z" />
                    </svg>
                </a>
                <a href="https://github.com/johackim" aria-label="Github">
                    <svg className="h-5 w-5 fill-current hover:text-black dark:hover:text-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                </a>
                <a href="https://linkedin.com/in/johackim" aria-label="LinkedIn">
                    <svg className="h-5 w-5 fill-current hover:text-black dark:hover:text-white" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </a>
                <a href="mailto:contact+blog@johackim.com" aria-label="Contact">
                    <svg className="h-5 w-5 fill-current hover:text-black dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
                    </svg>
                </a>
                <a href="/rss.xml" aria-label="Rss">
                    <svg className="h-5 w-5 fill-current hover:text-black dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="6.18" cy="17.82" r="2.18" />
                        <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
                    </svg>
                </a>
            </Footer>
        </>
    );
};

export default Layout;
