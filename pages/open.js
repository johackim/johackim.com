import 'chart.js/auto';
import { NextSeo } from 'next-seo';
import { Section, Card } from '@johackim/design-system';
import { Line } from 'react-chartjs-2';
import Layout from '@components/layout';
import {
    getChartMogulData,
    getPosthogData,
    getGithubStars,
    getGithubFollowers,
    getMastodonFollowers,
    getMailjetListSubscribers,
    getContents,
} from '@lib/utils';

const Page = ({ visitors, mrr, arr, twitter, mastodon, githubStars, githubFollowers, chartmogul, posthog, contents }) => (
    <Section className="pt-24 pb-12">
        <Section.Title className="text-center !my-0">Transparence</Section.Title>
        <Section.Description className="text-center dark:text-gray-300">Chiffre d'affaires, visiteurs, followers</Section.Description>
        <Section.Content className="container mx-auto px-4 !max-w-screen-lg mt-12 grid grid-cols-3 gap-5">
            <Card>
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">Total des abonnées e-mail</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">421</Card.Value>
            </Card>
            <Card>
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">Total des abonnées Twitter</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">{twitter}</Card.Value>
            </Card>
            <Card>
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">Total des abonnées Mastodon</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">{mastodon}</Card.Value>
            </Card>
            <Card>
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">Total des abonnées Github</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">{githubFollowers}</Card.Value>
            </Card>
            <Card>
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">Total des stars Github</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">{githubStars}</Card.Value>
            </Card>
            <Card>
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">Total des visiteurs</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">{visitors}</Card.Value>
            </Card>
            <Card>
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">Nombre de contenus</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">{contents}</Card.Value>
            </Card>
            <Card>
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">MRR (Chiffre d'affaires mensuel récurrent)</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">{`${mrr}€`}</Card.Value>
            </Card>
            <Card>
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">ARR (Chiffre d'affaires annuel récurrent)</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">{`${arr}€`}</Card.Value>
            </Card>
        </Section.Content>
        <Section.Content className="container mx-auto px-4 !max-w-screen-lg">
            <Card className="mt-5">
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">Activité Github</Card.Name>
                <Card.Value className="mt-1 !text-3xl font-semibold text-gray-900 dark:text-white">
                    <img src="https://ghchart.rshah.org/182831/johackim" className="w-full mt-2" alt="Github chart" /> {/* eslint-disable-line */}
                </Card.Value>
            </Card>
        </Section.Content>
        <Section.Content className="container mx-auto px-4 !max-w-screen-lg">
            <Card className="mt-5">
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">MRR (Chiffre d'affaires mensuel récurrent) en €</Card.Name>
                <Line
                    data={{
                        labels: chartmogul?.entries?.map((entry) => entry.date),
                        datasets: [{
                            data: chartmogul?.entries?.map((entry) => Math.round(entry.mrr / 100)),
                            fill: true,
                            borderColor: 'rgb(209, 213, 219)',
                            tension: 0.1,
                        }],
                    }}
                    options={{ plugins: { legend: { display: false } } }}
                    className="mt-4"
                />
            </Card>
            <Card className="mt-5">
                <Card.Name className="truncate text-sm !font-medium text-gray-500 dark:text-white">Visiteurs uniques</Card.Name>
                <Line
                    data={{
                        labels: posthog.map(({ date }) => date),
                        datasets: [{
                            data: posthog.map((data) => data.visitors),
                            fill: true,
                            borderColor: 'rgb(209, 213, 219)',
                            tension: 0.1,
                        }],
                    }}
                    options={{ plugins: { legend: { display: false } } }}
                    className="mt-4"
                />
            </Card>
        </Section.Content>
    </Section>
);

Page.getLayout = (page) => (
    <Layout className="bg-gray-100 dark:bg-gray-900">
        <NextSeo title="Transparence" />
        {page}
    </Layout>
);

export const getStaticProps = async () => {
    const posthog = await getPosthogData();
    const chartmogul = await getChartMogulData();

    return {
        props: {
            visitors: posthog?.reduce((prev, cur) => prev + cur.visitors, 0),
            mrr: chartmogul.currentMrr,
            arr: chartmogul.currentArr,
            contents: (await getContents()).length,
            mastodon: await getMastodonFollowers('1631'),
            githubStars: await getGithubStars('johackim') + await getGithubStars('ethibox'),
            githubFollowers: await getGithubFollowers('johackim'),
            subscribers: await getMailjetListSubscribers(),
            twitter: 195,
            chartmogul,
            posthog,
        },
    };
};

export default Page;
