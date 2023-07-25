import { NextSeo } from 'next-seo';
import { Button } from '@johackim/design-system';
import { useRouter } from 'next/router';
import Layout from '@components/layout';

const Page = () => {
    const router = useRouter();

    return (
        <section className="pt-20">
            <div className="container m-auto px-4 lg:max-w-screen-lg text-center">
                <p className="text-sm font-semibold uppercase tracking-wide">Erreur 404</p>

                <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Oh oh !</h1>

                <p className="mt-2 text-lg font-medium">La page que vous recherchez n'existe pas.</p>

                <div className="mt-4">
                    <Button onClick={() => router.push('/start')}>Retourner à l'accueil</Button>
                </div>
            </div>
        </section>
    );
};

Page.getLayout = (page) => (
    <Layout className="flex flex-col justify-center">
        <NextSeo title="Erreur 404" />
        {page}
    </Layout>
);

export default Page;
