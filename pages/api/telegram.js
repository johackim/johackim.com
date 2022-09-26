import { isAuth } from '@lib/utils';

export default async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (!isAuth(token, process.env.JWT_SECRET)) {
        return res.status(403).send({ success: false });
    }

    const url = process.env.TELEGRAM_INVITATION_LINK;

    return res.send({ url });
};
