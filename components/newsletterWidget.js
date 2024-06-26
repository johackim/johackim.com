import { Button, Input } from '@johackim/design-system';
import Newsletter from '@components/newsletter';

export default ({ className = '' }) => (
    <div className={`p-4 border dark:border-gray-800 mb-4 ${className}`}>
        <div>
            <svg className="h-4 w-4 fill-current inline dark:text-gray-300 align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="6.18" cy="17.82" r="2.18" /><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" /></svg>
            <span className="ml-2 align-middle">Rejoignez les {process.env.subscribers} abonnées</span>
        </div>

        <hr className="dark:border-gray-800 my-2" />

        <Newsletter>
            {({ handleChange, handleSubmit, error, success, email, isLoading }) => (
                <>
                    <div className="grid gap-2 mt-4">
                        <Input id="widget-email" type="email" name="email" value={email} onChange={handleChange} placeholder="Entrez votre email" className="w-full" required />
                        <Button type="submit" onClick={handleSubmit}>
                            { isLoading ? (
                                <span className="inline">Chargement...</span>
                            ) : (
                                <span>S'abonner à mon second cerveau</span>
                            ) }
                        </Button>
                    </div>
                    { error && <p className="text-xs text-red-600 my-4">{error}</p> }
                    { success && <p className="text-xs text-green-600 my-4"><b>Génial !</b> Vous vous êtes inscrit avec succès !</p> }
                </>
            )}
        </Newsletter>

        <p className="my-2 text-xs">Recevez chaque mise à jour de mon second cerveau dans votre boite e-mail.</p>
    </div>
);
