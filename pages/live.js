import { NextSeo } from 'next-seo';

import DefaultLayout from '@components/defaultLayout';

const URL = 'https://peertube.ethibox.fr/videos/embed/cf955d60-03f5-4071-919b-18f1ff668563?warningTitle=0&title=0&autoplay=1';

const Page = () => (
    <section className="pt-20">
        <div className="container m-auto px-4 lg:max-w-screen-md">
            <h1 className="text-center font-bold text-3xl">Observez le travail quotidien d'un hacker indépendant</h1>
            <h2 className="text-center md:text-lg mb-8">Je suis en live tous les jours de 9h à 13h 🥷</h2>
            <iframe title="Hacker Live" width="100%" height="400" src={URL} frameBorder="0" sandbox="allow-same-origin allow-scripts allow-popups" allowFullScreen="" />
        </div>
    </section>
);

Page.getLayout = (page) => (
    <DefaultLayout>
        <NextSeo title="Hacker Live" />
        {page}
    </DefaultLayout>
);

export default Page;
