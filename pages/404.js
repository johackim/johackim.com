import { NextSeo } from 'next-seo';

import DefaultLayout from '@components/defaultLayout';
import { Button } from '@johackim/design-system';

const Page = () => (
    <section className="pt-20">
        <div className="container m-auto px-4 lg:max-w-screen-lg text-center">
            <p className="text-sm font-semibold uppercase tracking-wide">Erreur 404</p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Oh oh !</h1>

            <p className="mt-2 text-lg font-medium">La page que vous recherchez n'existe pas.</p>

            <div className="mt-4">
                <Button href="/start">Retourner à l'accueil</Button>
            </div>
        </div>
    </section>
);

Page.getLayout = (page) => (
    <DefaultLayout className="flex flex-col justify-center">
        <NextSeo title="Erreur 404" />
        {page}
    </DefaultLayout>
);

export default Page;
