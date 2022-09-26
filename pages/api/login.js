import Stripe from 'stripe';

import { sendTemplateMail, LOGIN_TEMPLATE } from '@lib/mail';

export default async (req, res) => {
    const { email } = req.body;
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const customer = (await stripe.customers.list({ email }))?.data[0]?.id || false;
    const { data: subscriptions } = await stripe.subscriptions.list({ customer, status: 'active' }).catch(() => false);

    if (subscriptions) {
        await sendTemplateMail(email, LOGIN_TEMPLATE);
        return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: false });
};
