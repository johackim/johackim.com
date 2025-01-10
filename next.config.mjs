import fetch from 'node-fetch';

const TMP_VALUE = 415;

const getListmonkSubscribers = async () => {
    const { data } = await fetch(`https://listmonk.johackim.com/api/lists/${process.env.LISTMONK_LIST_ID}`, {
        headers: { Authorization: `Basic ${Buffer.from(`${process.env.LISTMONK_USERNAME}:${process.env.LISTMONK_PASSWORD}`).toString('base64')}` },
    }).then((res) => res.json()).catch(() => false);

    return data?.subscriber_count || TMP_VALUE; // https://github.com/knadh/listmonk/releases/tag/v4.0.1
};

export default async () => {
    const subscribers = await getListmonkSubscribers();

    return {
        env: { subscribers: String(subscribers) },
        output: 'export',
        staticPageGenerationTimeout: 180,
    };
};
