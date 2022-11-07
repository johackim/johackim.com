import Stripe from 'stripe';

export default async (req, res) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const { baseUrl, priceId, coupon } = req.body;

    const { url } = await stripe.checkout.sessions.create({
        success_url: `${baseUrl}/thanks`,
        cancel_url: `${baseUrl}/subscribe`,
        line_items: [{ price: priceId, quantity: 1 }],
        locale: 'fr',
        mode: 'subscription',
        ...(coupon && { discounts: [{ coupon }] }),
    });

    return res.send({ url });
};
