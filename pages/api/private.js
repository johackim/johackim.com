import { isAuth, getContent } from '@lib/utils';
import { compileMdxToJs } from '@lib/compile';

export default async (req, res) => {
    const { slug } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if (!isAuth(token, process.env.JWT_SECRET)) {
        return res.status(403).send({ success: false });
    }

    const { content } = await getContent(slug);
    const code = await compileMdxToJs(content, false);

    return res.send({ code });
};
