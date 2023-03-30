import { NextSeo, WebPageJsonLd } from 'next-seo';

import DefaultLayout from '@components/defaultLayout';
import { Hero, Button } from '@johackim/design-system';
import { useModal } from '@lib/contexts';
import { generateRssFeed } from '@lib/genrss';
import { useRouter } from 'next/router';
import Slider from '@components/slider';

const Page = ({ feedbacks }) => {
    const modal = useModal();
    const router = useRouter();

    return (
        <>
            <NextSeo
                title={process.env.NEXT_PUBLIC_SITE_TITLE}
                description={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
                openGraph={{
                    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
                    images: [{
                        url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile.jpg`,
                    }],
                }}
            />
            <WebPageJsonLd
                description={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
                id={process.env.NEXT_PUBLIC_SITE_URL}
            />
            <Hero
                headline={process.env.NEXT_PUBLIC_SITE_HEADLINE}
                subHeadline={process.env.NEXT_PUBLIC_SITE_SUBHEADLINE}
                centered={false}
            >
                <Button onClick={() => router.push('/start')}>Découvrir mon second cerveau</Button>
                <Button onClick={modal.open} secondary>S'abonner</Button>
            </Hero>
            <Slider slides={feedbacks} />
        </>
    );
};

export const getStaticProps = async () => {
    if (process.env.NODE_ENV === 'production') {
        await generateRssFeed({
            title: process.env.NEXT_PUBLIC_SITE_TITLE,
            description: process.env.NEXT_PUBLIC_SITE_SUBHEADLINE,
            url: process.env.NEXT_PUBLIC_SITE_URL,
        });
    }

    const feedbacks = [
        '« Article le plus consulté du Courrier du hacker de la semaine. Merci à lui, excellent article ! » - Journal du hacker',
        '« Un blog de grande qualité, avec plein d\'idées pour se faire une indépendance numérique. » - Louis-Olivier Brassard',
        '« Merci pour votre site que j\'ai découvert aujourd\'hui, il est excellent, c\'est pour moi une mine d\'or ! Il va m\'apporter beaucoup de bonnes choses, je le sens. » - Anonyme',
        '« Il est vraiment cool ton blog, continu ! » - Hito',
        '« Merci pour ce blog génial que je viens de découvrir, j\'adore ! » - Anonyme',
        '« Ce blog est vraiment génial, merci infiniment. » - Anonyme',
    ];

    return { props: { feedbacks } };
};

Page.getLayout = (page) => <DefaultLayout className="flex flex-col justify-center">{page}</DefaultLayout>;

export default Page;
