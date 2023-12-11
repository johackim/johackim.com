const fetch = require('node-fetch');

const getListmonkSubscribers = async () => {
    const { data } = await fetch(`https://listmonk.ethibox.fr/api/lists/${process.env.LISTMONK_LIST_ID}`, {
        headers: { Authorization: `Basic ${Buffer.from(`${process.env.LISTMONK_USERNAME}:${process.env.LISTMONK_PASSWORD}`).toString('base64')}` },
    }).then((res) => res.json()).catch(() => false);

    return data?.subscriber_count || 0;
};

module.exports = async () => {
    const subscribers = await getListmonkSubscribers();

    return {
        env: { subscribers },
        output: 'export',
        staticPageGenerationTimeout: 180,
    };
};
