const fetch = require('node-fetch');

const getMailjetListSubscribers = async () => {
    const { Data } = await fetch(`https://api.mailjet.com/v3/REST/contactslist?Name=${process.env.MAILJET_LIST_ID}`, {
        headers: { Authorization: `Basic ${Buffer.from(`${process.env.MAILJET_USERNAME}:${process.env.MAILJET_PASSWORD}`).toString('base64')}` },
    }).then((res) => res.json()).catch(() => false);

    return Data?.[0]?.SubscriberCount || 0;
};

module.exports = async () => {
    const subscribers = await getMailjetListSubscribers();

    return {
        env: { subscribers },
        output: 'export',
        staticPageGenerationTimeout: 180,
    };
};
