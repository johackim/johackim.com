import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import Layout from '../components/layout';

const WEBHOOK_URL = 'https://n8n.ethibox.fr/webhook/97b08542-655e-4655-acb2-1ce6872bc253';

export default ({ subscribers }) => {
    const [state, setState] = useState({ error: false, success: false, isLoading: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, error: false, success: false, isLoading: true });

        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = String(formData.get('email') || '');

        if (!isEmail(email)) {
            setState({ ...state, error: 'Veuillez saisir une adresse e-mail valide.', isLoading: false });
            return;
        }

        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })
            .then((res) => {
                if (res.status === 400) {
                    throw new Error('Votre adresse e-mail est invalide');
                }

                if (res.status === 409) {
                    throw new Error('Votre adresse e-mail est déjà inscrite à la newsletter');
                }

                if (res.status !== 200) {
                    throw new Error('Une erreur est survenue. Veuillez réessayer.');
                }

                return res;
            })
            .then((res) => res.json())
            .then(() => {
                setTimeout(() => {
                    setState({ ...state, error: false, isLoading: false, success: true });
                    form.reset();
                }, 1000);
            })
            .catch(({ message }) => {
                setState({ ...state, error: message, isLoading: false });
            });
    };

    const { error, success, isLoading } = state;

    return (
        <Layout>
            <section className="min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center">
                <h2 className="font-semibold text-gray-700 text-center text-4xl lg:text-6xl">
                    {`Rejoignez les ${subscribers} abonnées`}
                </h2>
                <p className="text-center my-1 text-base text-gray-500 lg:text-3xl">Recevez chaque mise à jour de mon second cerveau dans votre boite e-mail</p>

                <form onSubmit={handleSubmit} className="my-4 grid gap-2 w-full px-4 sm:grid-flow-col sm:auto-cols-max sm:justify-center">
                    <input type="email" name="email" className="p-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-none focus:ring-0 text-gray-700 w-full md:w-80" placeholder="Entrez votre email" required />

                    <button type="submit" className="px-5 py-2 rounded-md cursor-pointer bg-cyan-700 text-white hover:text-white hover:bg-cyan-800">
                        {isLoading ? (<span>Chargement en cours...</span>) : (<span>S'abonner à mon second cerveau</span>)}
                    </button>
                </form>

                { error && <p className="text-red-600 text-center my-4">{error}</p> }
                { success && (
                    <p className="text-green-600 text-center my-4">
                        <b>Génial !</b>
                        {' '}
                        Vous vous êtes inscrit avec succès !
                    </p>
                ) }

                <p className="text-xs text-center">🔒 100% sécurisé - Votre adresse email ne sera jamais cédée ni revendue.</p>
                <p className="text-xs text-center">Vous restez libre de vous désinscrire à tout moment en 1 clic.</p>
            </section>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const data = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json()).catch(() => false);

    return { props: { subscribers: data?.total || 0 } };
};
