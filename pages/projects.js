import DefaultLayout from '@components/defaultLayout';
import { NextSeo } from 'next-seo';
import { Link, Card, Badge } from '@johackim/design-system';
import { getChartMogulData, getGithubRepoStars } from '@lib/utils';

const Page = ({ ethiboxMrr, hacklabStars, rdcliStars }) => {
    const projects = [
        {
            name: 'Ethibox',
            description: 'Gérez vos données de manière éthique',
            url: 'https://ethibox.fr/',
            badge: <Badge color="green">{ethiboxMrr}€ / mois</Badge>,
        },
        {
            name: 'docker-hacklab',
            description: "Effectuez vos tests d'intrusion depuis un conteneur Docker",
            url: 'https://github.com/johackim/docker-hacklab',
            badge: <Badge color="blue">{hacklabStars} Github stars</Badge>,
        },
        {
            name: 'rdcli',
            description: 'Débrider vos fichiers DDL et torrents depuis votre terminal',
            url: 'https://github.com/johackim/rdcli',
            badge: <Badge color="blue">{rdcliStars} Github stars</Badge>,
        },
        {
            name: 'Nearyou',
            description: 'Accédez aux concerts de vos artistes préférés proches de chez vous',
            url: 'https://nearyou.show',
            badge: <Badge color="yellow">En cours</Badge>,
        },
        {
            name: 'Colivlist',
            description: 'Trouvez votre prochain espace de coliving parmi plus +900 espaces',
            url: 'https://colivlist.com',
            badge: <Badge color="yellow">En cours</Badge>,
        },
        {
            name: 'Netclix',
            description: 'Un outil CLI pour regarder des films en streaming',
            url: 'https://github.com/johackim/netclix',
            badge: <Badge color="red">Archivé</Badge>,
        },
        {
            name: 'Relax',
            description: "Service d'auto-gestion clientèle pour auto-entrepreneurs",
            url: 'https://github.com/johackim/relax',
            badge: <Badge color="red">Archivé</Badge>,
        },
        {
            name: 'Nocodeur',
            description: 'Apprenez à créer vos applications sans savoir coder',
            url: 'https://nocodeur.com',
            badge: <Badge color="red">Archivé</Badge>,
        },
        {
            name: 'Nomadless',
            description: "Gérez votre business sur n'importe quel appareil avec un navigateur",
            url: 'https://dwkzr.csb.app/',
            badge: <Badge color="red">Archivé</Badge>,
        },
    ];

    return (
        <section className="pt-20 pb-10">
            <h1 className="text-center font-bold text-3xl">Mes projets</h1>
            <h2 className="text-center md:text-lg mb-8">Découvrez la liste de tous mes projets</h2>

            <div className="container m-auto px-4 lg:max-w-screen-lg">
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map(({ name, description, url, badge }) => (
                        <Link key={name} href={url} target="_blank">
                            <Card name={name} value={description} right={badge} small />
                        </Link>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export const getStaticProps = async () => {
    const { currentMrr: ethiboxMrr } = await getChartMogulData();
    const hacklabStars = await getGithubRepoStars('johackim/docker-hacklab');
    const rdcliStars = await getGithubRepoStars('johackim/rdcli');

    return {
        props: { ethiboxMrr, hacklabStars, rdcliStars },
        revalidate: 86400,
    };
};

Page.getLayout = (page) => (
    <DefaultLayout className="bg-gray-100 dark:bg-gray-900">
        <NextSeo title="Mes projets" />
        {page}
    </DefaultLayout>
);

export default Page;
