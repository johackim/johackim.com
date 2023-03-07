import Stripe from 'stripe';
import { NextSeo } from 'next-seo';
import { parseBody } from 'next/dist/server/api-utils/node';

import DefaultLayout from '@components/defaultLayout';
import { Button } from '@johackim/design-system';
import { useRouter } from 'next/router';
import { sendTemplateMail, SUBSCRIBE_TEMPLATE } from '@lib/mail';

const Page = () => {
    const router = useRouter();

    return (
        <section className="pt-20">
            <div className="container m-auto px-4 lg:max-w-screen-sm text-center">
                <p className="text-3xl font-bold">Bravo 😀 !</p>
                <p className="text-base font-bold">Vous êtes membre premium</p>
                <p className="text-base">Un mail a été envoyé. Une fois connecté, vous aurez accès aux contenus premium.</p>
                <Button onClick={() => router.push('/')} className="mt-4">Retourner sur la page d'accueil</Button>
            </div>
        </section>
    );
};

export const getServerSideProps = async ({ req }) => {
    const id = (await parseBody(req)).data?.object?.id;
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const subscription = await stripe.subscriptions.retrieve(id).catch(() => false);

    if (subscription && subscription.plan.active) {
        const { email } = await stripe.customers.retrieve(subscription.customer);
        await sendTemplateMail(email, SUBSCRIBE_TEMPLATE);
    }

    return { props: {} };
};

Page.getLayout = (page) => (
    <DefaultLayout className="flex flex-col justify-center">
        <NextSeo title="Merci !" />
        {page}
    </DefaultLayout>
);

export default Page;
