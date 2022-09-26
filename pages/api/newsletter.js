import { v5 as uuidv5 } from 'uuid';

import { isValidEmail } from '@lib/utils';

export default async (req, res) => {
    const { email } = req.body;

    if (await isValidEmail(email)) {
        const id = uuidv5(email, uuidv5.URL);

        fetch(process.env.NEWSLETTER_WEBHOOK, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ id, email }),
        });

        return res.json({ success: true, id });
    }

    return res.json({ success: false });
};
