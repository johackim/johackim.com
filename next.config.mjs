import fetch from 'node-fetch';

const getListmonkSubscribers = async () => {
    const token = Buffer.from(`${process.env.LISTMONK_USERNAME}:${process.env.LISTMONK_PASSWORD}`).toString('base64');

    const { data } = await fetch('https://listmonk.johackim.com/api/subscribers', {
        headers: { Authorization: `Basic ${token}` },
    }).then((res) => res.json()).catch(() => false);

    return data?.total || 0;
};

export default async () => {
    const subscribers = await getListmonkSubscribers();

    return {
        env: { subscribers: String(subscribers) },
        output: 'export',
        staticPageGenerationTimeout: 180,
    };
};
