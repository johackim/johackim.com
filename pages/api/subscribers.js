import { getMailjetListSubscribers } from '@lib/utils';

export default async (_, res) => {
    const subscribers = await getMailjetListSubscribers(process.env.MAILJET_SUBSCRIBER_LIST);
    res.setHeader('Cache-control', 'public, max-age=3600');
    res.status(200).send({ subscribers });
};
