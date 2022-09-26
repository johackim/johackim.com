import { NextSeo } from 'next-seo';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import decode from 'jwt-decode';
import isEmail from 'validator/lib/isEmail';

import DefaultLayout from '@components/defaultLayout';
import { Input, Link, Button, Loading } from '@johackim/design-system';
import { useAuth } from '@lib/atoms';

const Page = () => {
    const [state, setState] = useState({ email: '', error: false, success: false, isLoading: false });
    const { connect } = useAuth();

    const router = useRouter();
    const { token, redirect } = router.query;

    useEffect(() => {
        if (token) {
            const { id, email } = decode(token);
            connect({ id, email, token });

            if (email && window.posthog) {
                window.posthog.identify(id);
                window.posthog.people.set({ email });
            }

            document.location.href = redirect || '/';
        }
    }, [token]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value, error: false, isLoading: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email } = state;

        let error;

        if (!isEmail(email)) {
            error = 'Veuillez saisir une adresse e-mail valide.';
            setState({ ...state, error, success: false });
        }

        if (!error) {
            setState({ ...state, isLoading: true });

            await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
                .then((res) => res.json())
                .then(({ success }) => {
                    if (!success) throw new Error(`Il n'existe aucun compte associé à l'adresse e-mail ${email}`);
                    setState({ ...state, success: true, error: false, email: '', isLoading: false });
                })
                .catch(({ message }) => {
                    setState({ ...state, error: message, success: false, isLoading: false });
                });
        }
    };

    const { email, error, success, isLoading } = state;

    if (token) {
        return (
            <section className="pt-20">
                <div className="container m-auto px-4 lg:max-w-screen-sm text-center">
                    <Loading message="Connexion en cours" />
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 px-4 lg:px-0 mt-10">
            <div className="container m-auto lg:px-4 lg:max-w-screen-md text-center">
                <div className="pt-5 text-center">
                    <p className="mt- text-3xl leading-9 font-extrabold dark:text-gray-300 sm:text-4xl sm:leading-10 lg:text-5xl lg:leading-none">Espace de connexion</p>
                    <p className="mt-3 max-w-4xl mx-auto text-xl leading-7 dark:text-gray-300 sm:mt-5 sm:text-2xl sm:leading-8">Connectez-vous à votre compte pour obtenir un accès complet</p>
                </div>

                <div className="mt-4">
                    <form action="#" method="POST" onSubmit={handleSubmit}>
                        <div className="grid gap-2 mx-auto lg:max-w-lg">
                            <Input type="email" name="email" value={email} onChange={handleChange} placeholder="Entrez votre e-mail" className="w-full" required />
                            <Button type="submit" onClick={handleSubmit}>
                                { isLoading ? (
                                    <span>Chargement...</span>
                                ) : (
                                    <span>Recevoir un lien de connexion</span>
                                ) }
                            </Button>
                        </div>

                        { error && <p className="text-red-600 my-4">{error}</p> }
                        { success && <p className="text-green-600 my-4">Génial ! Vérifiez votre boîte de réception et cliquez sur le lien pour terminer la connexion</p> }
                    </form>
                </div>

                <p className="mt-4">Vous n'avez pas encore de compte ? <Link href="/subscribe" className="underline">Abonnez-vous</Link></p>
            </div>
        </section>
    );
};

Page.getLayout = (page) => (
    <DefaultLayout className="flex flex-col justify-center">
        <NextSeo title="Se connecter" />
        {page}
    </DefaultLayout>
);

export default Page;
