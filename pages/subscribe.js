import Stripe from 'stripe';
import { NextSeo } from 'next-seo';

import DefaultLayout from '@components/defaultLayout';
import { Button, Link, Pricing } from '@johackim/design-system';
import { useModal } from '@lib/contexts';

const Page = ({ plans, features }) => {
    const modal = useModal();

    const subscribe = async ({ priceId, coupon, ...props }) => {
        if (props.modal) {
            modal.open();
            return;
        }

        const baseUrl = `${window.location.protocol}//${window.location.host}`;

        const { url } = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ baseUrl, priceId, coupon }),
        })
            .then((res) => res.json());

        await window.location.replace(url);
    };

    return (
        <section className="py-10 px-4 lg:px-0 mt-10 bg-gray-50 dark:bg-gray-900">
            <div className="container m-auto lg:px-4 lg:max-w-screen-lg">
                <div className="px-4 sm:px-6 lg:px-8 pt-5 text-center">
                    <p className="text-3xl leading-9 font-extrabold dark:text-white sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-none">Espace premium</p>
                    <p className="mt-3 max-w-4xl mx-auto text-xl leading-7 dark:text-gray-300 sm:mt-5 sm:text-2xl sm:leading-8">Débloquez l'accès complet aux contenus privés d'un hacker indépendant</p>
                </div>

                <p className="my-4 text-center">
                    <span>Déjà inscrit ?</span>
                    <Link href="/login" className="underline ml-1">Cliquez-ici pour vous connecter</Link>
                </p>

                <Pricing
                    className="mt-12 !lg:gap-3"
                    plans={plans.map((plan) => ({
                        ...plan,
                        onClick: subscribe,
                        className: 'bg-white dark:bg-gray-800',
                        ...(plan?.spots?.left === 0 && {
                            button: <Button className="inline-block w-full mx-2 cursor-not-allowed">Inscription fermée</Button>,
                        }),
                    }))}
                    features={features}
                />

                <p className="text-center mt-8"><b>Note</b>: Abonnement sans engagement. Vous pouvez annuler à tout moment et sans frais.</p>
            </div>
        </section>
    );
};

export const getStaticProps = async () => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const { data: coupons } = await stripe.coupons.list();
    const price = await stripe.prices.retrieve(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID);
    const coupon = !!coupons.length && coupons[0];

    const plans = [
        {
            name: 'Abonnement premium',
            price: price.unit_amount / 100,
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
            ...(coupon && {
                head: 'Offre limitée',
                reduction: coupon.amount_off / 100,
                coupon: coupon.id,
                spots: { total: coupon.max_redemptions, left: coupon.max_redemptions - coupon.times_redeemed },
            }),
        },
        { name: 'Abonnement gratuit', price: 0, modal: true },
    ];

    const features = [
        { name: 'Accédez à mon Telegram privée', plans: [1] },
        { name: 'Accédez aux contenus exclusifs', plans: [1] },
        { name: 'Téléchargez mon second cerveau', plans: [1] },
        { name: 'Recevez ma newsletter gratuitement', plans: [1, 2] },
    ];

    return { props: { plans, features }, revalidate: 300 };
};

Page.getLayout = (page) => (
    <DefaultLayout>
        <NextSeo title="Espace premium" />
        {page}
    </DefaultLayout>
);

export default Page;
