import { useModal } from '@lib/atoms';
import { Button, Link } from '@johackim/design-system';

const Soon = ({ back = true }) => {
    const { openModal } = useModal();

    return (
        <div className="border dark:border-gray-800 rounded p-6 lg:p-14 text-center my-4">
            <p className="font-bold !my-0">🚧 Ce contenu n'est pas encore disponible</p>
            <p className="!my-0">Abonnez-vous pour être informé dès qu'il sortira... </p>
            <Button onClick={openModal} className="my-2">
                S'abonner
            </Button>
            <p className="!my-0">
                <small>
                    Ou{' '}
                    {back ? (
                        <button type="button" onClick={() => window.history.back()} className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white underline text-sm">
                            retourner sur la page précédente
                        </button>
                    ) : (
                        <Link href="/start" className="underline text-sm">retourner à l'accueil</Link>
                    )}
                </small>
            </p>
        </div>
    );
};

export default Soon;
