import { useState } from 'react';
import isEmail from 'validator/lib/isEmail';

export default ({ children }) => {
    const [state, setState] = useState({ email: '', error: false, success: false, isLoading: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value, error: false, success: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setState({ ...state, error: false, success: false, isLoading: true });

        const { email } = state;
        let error;

        if (!isEmail(email)) {
            error = 'Veuillez saisir une adresse e-mail valide.';
            setState({ ...state, error });
        }

        if (!error) {
            await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
                .then((res) => res.json())
                .then(({ success, id }) => {
                    if (!success) throw new Error('Veuillez entrer une adresse e-mail valide');

                    if (id && window.posthog) {
                        window.posthog.identify(id);
                        window.posthog.people.set({ email });
                    }

                    setTimeout(() => {
                        setState({ ...state, email: '', error: false, isLoading: false, success: true });
                    }, 1000);
                }).catch(({ message }) => {
                    setState({ ...state, error: message, isLoading: false });
                });
        }
    };

    const { email, error, success, isLoading } = state;

    return children({ email, error, success, isLoading, handleChange, handleSubmit });
};
