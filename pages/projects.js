import DefaultLayout from '@components/defaultLayout';
import { NextSeo } from 'next-seo';
import { Link, Card, Badge } from '@johackim/design-system';
import { getChartMogulData, getGithubRepoStars } from '@lib/utils';

const Page = ({ projects }) => (
    <section className="pt-20 pb-10">
        <h1 className="text-center font-bold text-3xl">Mes projets</h1>
        <h2 className="text-center md:text-lg mb-8">Découvrez la liste de tous mes projets</h2>

        <div className="container m-auto px-4 lg:max-w-screen-lg">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map(({ name, description, url, badge, color }) => (
                    <Link key={name} href={url} target="_blank">
                        <Card name={name} value={description} right={<Badge color={color}>{badge}</Badge>} small />
                    </Link>
                ))}
            </dl>
        </div>
    </section>
);

export const getStaticProps = async () => {
    const { currentMrr: ethiboxMrr } = await getChartMogulData();

    const projects = [
        {
            name: 'Ethibox',
            description: 'Gérez vos données de manière éthique',
            url: 'https://ethibox.fr/',
            badge: `${ethiboxMrr}€ / mois`,
            color: 'green',
        },
        {
            name: 'awesome-stacks',
            description: 'Déployez +90 applications avec une commande Docker',
            url: 'https://github.com/ethibox/awesome-stacks',
            badge: `${await getGithubRepoStars('ethibox/awesome-stacks')} Github stars`,
            color: 'blue',
        },
        {
            name: 'docker-hacklab',
            description: "Effectuez vos tests d'intrusion depuis un conteneur Docker",
            url: 'https://github.com/johackim/docker-hacklab',
            badge: `${await getGithubRepoStars('johackim/docker-hacklab')} Github stars`,
            color: 'blue',
        },
        {
            name: 'rdcli',
            description: 'Débrider vos fichiers DDL et torrents depuis votre terminal',
            url: 'https://github.com/johackim/rdcli',
            badge: `${await getGithubRepoStars('johackim/rdcli')} Github stars`,
            color: 'blue',
        },
        {
            name: 'obsidian-writing',
            description: 'Écrivez votre prochain livre depuis Obsidian',
            url: 'https://github.com/johackim/obsidian-writing',
            badge: `${await getGithubRepoStars('johackim/obsidian-writing')} Github stars`,
            color: 'blue',
        },
        {
            name: 'dotfiles',
            description: 'Ma configuration personnelle Arch Linux',
            url: 'https://github.com/johackim/dotfiles',
            badge: `${await getGithubRepoStars('johackim/dotfiles')} Github stars`,
            color: 'blue',
        },
        {
            name: 'awesome-indiehackers',
            description: 'Liste de ressources pour indie hackers',
            url: 'https://github.com/johackim/awesome-indiehackers',
            badge: `${await getGithubRepoStars('johackim/awesome-indiehackers')} Github stars`,
            color: 'blue',
        },
        {
            name: 'Nearyou',
            description: 'Accédez aux concerts de vos artistes préférés proches de chez vous',
            url: 'https://nearyou.show',
            badge: 'En cours',
            color: 'yellow',
        },
        {
            name: 'Colivlist',
            description: 'Trouvez votre prochain espace de coliving parmi plus +900 espaces',
            url: 'https://colivlist.com',
            badge: 'En cours',
            color: 'yellow',
        },
        {
            name: 'Netclix',
            description: 'Un outil CLI pour regarder des films en streaming',
            url: 'https://github.com/johackim/netclix',
            badge: 'Archivé',
            color: 'red',
        },
        {
            name: 'Relax',
            description: "Service d'auto-gestion clientèle pour auto-entrepreneurs",
            url: 'https://github.com/johackim/relax',
            badge: 'Archivé',
            color: 'red',
        },
        {
            name: 'Nocodeur',
            description: 'Apprenez à créer vos applications sans savoir coder',
            url: 'https://nocodeur.com',
            badge: 'Archivé',
            color: 'red',
        },
        {
            name: 'Nomadless',
            description: "Gérez votre business sur n'importe quel appareil avec un navigateur",
            url: 'https://dwkzr.csb.app/',
            badge: 'Archivé',
            color: 'red',
        },
    ];

    return {
        props: { projects },
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
