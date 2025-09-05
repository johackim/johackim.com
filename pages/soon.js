import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

export default () => {
    const router = useRouter();
    const { title } = router.query;

    return (
        <Layout>
            <section className="pt-20 min-h-[calc(100vh-6rem)]">
                <div className="container m-auto px-4 lg:max-w-screen-lg">
                    <div className="md:border border-gray-200">
                        {title && (
                            <h1 className="h-64 flex flex-col justify-center relative border-b border-gray-200">
                                <span className="absolute inset-0 bg-gray-100 opacity-80 z-10" />
                                <span className="transform text-center font-bold px-4 text-4xl text-gray-600 z-20">{title}</span>
                            </h1>
                        )}
                        <div className="p-6 lg:p-12 text-center flex flex-col gap-2">
                            <p className="font-bold">🚧 Ce contenu n'est pas encore disponible</p>
                            <p>Abonnez-vous pour être informé dès qu'il sortira... </p>
                            <Link href="/newsletter" passHref>
                                <button type="button" className="bg-gray-600 text-white hover:text-white hover:bg-gray-700 px-5 py-2 rounded-md cursor-pointer">S'abonner</button>
                            </Link>
                            <p>
                                <small>
                                    Ou
                                    {' '}
                                    <button type="button" onClick={() => router.back()} className="text-gray-700 hover:text-gray-900 underline text-sm cursor-pointer">
                                        retourner sur la page précédente
                                    </button>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};
