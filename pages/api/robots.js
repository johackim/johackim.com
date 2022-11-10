import { getContents } from '@lib/utils';

export default async (req, res) => {
    const contents = await getContents();
    const dissallowUrls = contents.filter(({ disallow }) => disallow || false)
        .map(({ slug }) => `Disallow: /${slug}`);

    const robotsTxt = [
        'User-agent: *',
        'Allow: /',
        `Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap-0.xml`,
        `Host: ${process.env.NEXT_PUBLIC_SITE_URL}`,
        ...dissallowUrls,
    ].join('\n');

    res.send(robotsTxt);
};
