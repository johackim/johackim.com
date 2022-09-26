import Stripe from 'stripe';
import jwt from 'jsonwebtoken';

import { isAuth } from '@lib/utils';

export default async (req, res) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (!isAuth(token, process.env.JWT_SECRET)) {
        return res.status(403).send({ success: false });
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const { data: customers } = await stripe.customers.list({ email });
    const customerId = customers[0].id;

    const { url } = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    }).catch(() => false);

    return res.send({ url });
};
