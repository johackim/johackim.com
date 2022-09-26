import { Link } from '@johackim/design-system';

const Reserved = () => (
    <div className="border dark:border-gray-800 rounded p-6 lg:p-14 text-center my-4">
        <p className="font-bold !my-0">🚧 Ce contenu est réservée aux abonnées premium</p>
        <p className="!my-0">Vous devez devenir membre pour pouvoir lire ce contenu </p>

        <a href="/subscribe" className="my-2 inline-flex rounded-md items-center justify-center px-5 py-2 border border-transparent text-white bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-300 focus:outline-none !no-underline hover:!text-white">S'abonner</a> {/* eslint-disable-line */}

        <p className="!my-0">
            <small>
                Vous avez déjà un compte ?{' '}
                <Link href="/login" className="underline">
                    Se connecter
                </Link>
            </small>
        </p>
    </div>
);

Reserved.defaultProps = {
    title: '',
    className: '',
};

export default Reserved;
