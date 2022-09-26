import { useState, useEffect } from 'react';
import Newsletter from '@lib/newsletter';
import { Button, Input } from '@johackim/design-system';

const NewsletterWidget = ({ className }) => {
    const [subscribers, setNewsletterrs] = useState('x');

    useEffect(() => {
        fetch('/api/subscribers')
            .then((res) => res.json())
            .then((data) => {
                setNewsletterrs(data.subscribers);
            });
    }, [subscribers]);

    return (
        <div className={`p-4 border dark:border-gray-800 mb-4 ${className}`}>
            <div>
                <svg className="h-4 w-4 fill-current inline dark:text-gray-300 align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="6.18" cy="17.82" r="2.18" /><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" /></svg>
                <span className="ml-2 align-middle">Rejoignez les {subscribers} abonnées</span>
            </div>

            <hr className="dark:border-gray-800 my-2" />

            <Newsletter>
                {({ handleChange, handleSubmit, error, success, email, isLoading }) => (
                    <>
                        <form action="#" className="grid gap-2 mt-4" onSubmit={handleSubmit}>
                            <Input id="widget-email" type="email" name="email" value={email} onChange={handleChange} placeholder="Entrez votre email" className="w-full" required />
                            <Button type="submit" onClick={handleSubmit}>
                                { isLoading ? (
                                    <span className="inline">Chargement...</span>
                                ) : (
                                    <span>S'abonner au hacklab</span>
                                ) }
                            </Button>

                        </form>
                        { error && <p className="text-xs text-red-600 my-4">{error}</p> }
                        { success && <p className="text-xs text-green-600 my-4"><b>Génial !</b> Vous vous êtes inscrit avec succès !</p> }
                    </>
                )}
            </Newsletter>

            <p className="my-2 text-xs">Recevez chaque semaine les mises à jour du hacklab dans votre boite e-mail.</p>
        </div>
    );
};

NewsletterWidget.defaultProps = {
    className: '',
};

export default NewsletterWidget;
