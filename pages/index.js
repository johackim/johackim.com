import { NextSeo, WebPageJsonLd } from 'next-seo';
import { Hero, Link, Button } from '@johackim/design-system';
import { generateRssFeeds } from '@lib/rss';
import Slider from '@components/slider';
import Layout from '@components/layout';

const TITLE = 'Hacker indépendant';

const DESCRIPTION = 'Créateur indépendant de projets open-source';

const FEEDBACKS = [
    '« Article le plus consulté du Courrier du hacker de la semaine. Merci à lui, excellent article ! » - Journal du hacker',
    "« Je suis le blog depuis un moment, c'est un excellent taf, très inspirant ! » - Eliott Meunier",
    '« Un blog de grande qualité, avec plein d\'idées pour se faire une indépendance numérique. » - Louis-Olivier Brassard',
    '« Il est vraiment cool ton blog, continu ! » - Hito',
    '« Merci pour votre site que j\'ai découvert aujourd\'hui, il est excellent, c\'est pour moi une mine d\'or ! Il va m\'apporter beaucoup de bonnes choses, je le sens. » - Anonyme',
    '« Merci pour ce blog génial que je viens de découvrir, j\'adore ! » - Anonyme',
    '« Ce blog est vraiment génial, merci infiniment. » - Anonyme',
];

export default () => (
    <Layout className="flex flex-col justify-center">
        <NextSeo
            title={TITLE}
            description={DESCRIPTION}
            openGraph={{
                description: DESCRIPTION,
                images: [{
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile.jpg`,
                }],
            }}
        />
        <WebPageJsonLd
            description={DESCRIPTION}
            id={process.env.NEXT_PUBLIC_SITE_URL}
        />
        <Hero
            headline={TITLE}
            subHeadline={DESCRIPTION}
            centered={false}
        >
            <Link as={Button} href="/start">Découvrir mon second cerveau</Link>
            <Link as={Button} href="/newsletter" secondary>S'abonner</Link>
        </Hero>
        <Slider slides={FEEDBACKS} />
    </Layout>
);

export const getStaticProps = async () => {
    if (process.env.NODE_ENV === 'production') {
        await generateRssFeeds();
    }

    return { props: {} };
};
