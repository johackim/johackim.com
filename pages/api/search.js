import { findContents, removeEmojies } from '@lib/utils';

export default async (req, res) => {
    const { search } = req.body;

    let results = [];

    if (search.length >= 3) {
        results = (await findContents(search)).map(({ slug, title }) => ({ href: slug, title: removeEmojies(title) }));
    }

    res.send({ results });
};
