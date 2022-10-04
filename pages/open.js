import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';

import DefaultLayout from '@components/defaultLayout';
import { getTwitterFollowers, getMastodonFollowers, getGithubFollowers, getGithubStars, getChartMogulData, getPosthogData, getContents, getMailjetListSubscribers } from '@lib/utils';

const Line = dynamic(() => import('react-chartjs-2').then((component) => component.Line));

const Page = ({ contents, twitterFollowers, mastodonFollowers, githubFollowers, githubStars, visitors, subscribers, chartMogulData, posthogData, mrr, arr }) => (
    <section className="pt-20 pb-10">
        <h1 className="text-center font-bold text-3xl">Transparence</h1>
        <h2 className="text-center md:text-lg mb-8">Chiffre d'affaires, visiteurs, followers</h2>

        <div className="container m-auto px-4 lg:max-w-screen-lg grid gap-5">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">Total des abonnés e-mail</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{subscribers}</dd>
                </div>

                <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">Total des abonnés Twitter</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{twitterFollowers}</dd>
                </div>

                <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">Total des abonnés Mastodon</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{mastodonFollowers}</dd>
                </div>
            </dl>

            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">Total des abonnés Github</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{githubFollowers}</dd>
                </div>

                <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">Total des stars Github</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{githubStars}</dd>
                </div>

                <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">Total des visiteurs</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{visitors}</dd>
                </div>
            </dl>

            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">Nombre d'articles & notes</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{contents}</dd>
                </div>

                <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">MRR (Chiffre d'affaires mensuel récurrent)</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{mrr}€</dd>
                </div>

                <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">ARR (Chiffre d'affaires annuel récurrent)</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{arr}€</dd>
                </div>
            </dl>

            <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">Activité Github</dt>
                <img src="https://ghchart.rshah.org/182831/johackim" className="w-full mt-2" alt="Github chart" /> {/* eslint-disable-line */}
            </div>

            <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">MRR (Chiffre d'affaires mensuel récurrent) en €</dt>
                <Line
                    data={{
                        labels: chartMogulData.map((entry) => entry.date),
                        datasets: [{
                            data: chartMogulData.map((entry) => Math.round(entry.mrr / 100)),
                            fill: true,
                            borderColor: 'rgb(209, 213, 219)',
                            tension: 0.1,
                        }],
                    }}
                    options={{ plugins: { legend: { display: false } } }}
                    className="mt-4"
                />
            </div>

            <div className="px-4 py-5 bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 dark:text-white truncate">Visiteurs uniques</dt>
                <Line
                    data={{
                        labels: posthogData.map(({ date }) => date),
                        datasets: [{
                            data: posthogData.map((data) => data.visitors),
                            fill: true,
                            borderColor: 'rgb(209, 213, 219)',
                            tension: 0.1,
                        }],
                    }}
                    options={{ plugins: { legend: { display: false } } }}
                    className="mt-4"
                />
            </div>
        </div>
    </section>
);

export const getStaticProps = async () => {
    const chartMogulData = await getChartMogulData();
    const posthogData = await getPosthogData();
    const contents = (await getContents()).length;
    const subscribers = await getMailjetListSubscribers(process.env.MAILJET_SUBSCRIBER_LIST);

    return {
        props: {
            twitterFollowers: await getTwitterFollowers('_johackim'),
            mastodonFollowers: await getMastodonFollowers('1631'),
            githubFollowers: await getGithubFollowers('johackim'),
            githubStars: await getGithubStars('johackim'),
            arr: chartMogulData.currentArr,
            mrr: chartMogulData.currentMrr,
            visitors: posthogData.reduce((prev, cur) => prev + cur.visitors, 0),
            chartMogulData: chartMogulData.entries || [],
            posthogData,
            contents,
            subscribers,
        },
        revalidate: 86400,
    };
};

Page.getLayout = (page) => (
    <DefaultLayout className="bg-gray-100 dark:bg-gray-900">
        <NextSeo title="Transparence" />
        {page}
    </DefaultLayout>
);

Page.defaultProps = {
    arr: 0,
    mrr: 0,
    contents: 0,
    twitterFollowers: 0,
    mastodonFollowers: 0,
    githubFollowers: 0,
    githubStars: 0,
    visitors: 0,
    subscribers: 0,
    chartMogulData: [],
    posthogData: [],
};

export default Page;
