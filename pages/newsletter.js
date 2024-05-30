import { NextSeo } from 'next-seo';
import { Section, Input, Button } from '@johackim/design-system';
import Newsletter from '@components/newsletter';
import Layout from '@components/layout';

const Page = () => (
    <Section>
        <Section.Title className="text-center !my-0 text-2xl lg:!text-6xl">Rejoignez les {process.env.subscribers} abonnées</Section.Title>
        <Section.Description className="text-center dark:text-gray-300 mt-1 text-base lg:!text-3xl">Recevez chaque mise à jour de mon second cerveau dans votre boite e-mail</Section.Description>
        <Section.Content className="container mx-auto px-4 !max-w-screen-lg mt-4">
            <Newsletter>
                {({ handleChange, handleSubmit, error, success, email, isLoading }) => (
                    <>
                        <div className="my-4 grid gap-2 sm:grid-flow-col sm:auto-cols-max sm:justify-center">
                            <Input type="email" name="email" value={email} onChange={handleChange} className="w-full md:w-80" placeholder="Entrez votre email" required />
                            <Button type="submit" onClick={handleSubmit}>
                                {isLoading ? (<span>Chargement en cours...</span>) : (<span>S'abonner à mon second cerveau</span>)}
                            </Button>
                        </div>
                        { error && <p className="text-red-600 text-center my-4">{error}</p> }
                        { success && <p className="text-green-600 text-center my-4"><b>Génial !</b> Vous vous êtes inscrit avec succès !</p> }
                    </>
                )}
            </Newsletter>

            <p className="text-xs text-center">🔒 100% sécurisé - Votre adresse email ne sera jamais cédée ni revendue.</p>
            <p className="text-xs text-center">Vous restez libre de vous désinscrire à tout moment en 1 clic.</p>
        </Section.Content>
    </Section>
);

Page.getLayout = (page) => (
    <Layout className="flex flex-col justify-center">
        <NextSeo title="Newsletter" />
        {page}
    </Layout>
);

export default Page;
