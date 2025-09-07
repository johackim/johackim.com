import Link from 'next/link';
import Layout from '../components/layout';

export default () => (
    <Layout>
        <section className="min-h-[calc(100vh-6rem)] flex justify-center items-center">
            <div className="container m-auto lg:max-w-screen-lg text-center">
                <p className="text-sm font-semibold uppercase tracking-wide">Erreur 404</p>

                <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Oh oh !</h1>

                <p className="mt-2 text-lg font-medium">La page que vous recherchez n'existe pas.</p>

                <div className="mt-4">
                    <Link href="/" passHref>
                        <button type="button" className="border border-gray-300 text-gray-700 cursor-pointer hover:text-gray-900 hover:border-gray-400 rounded-md px-2.5 py-1.5">
                            Retourner à l'accueil
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    </Layout>
);
