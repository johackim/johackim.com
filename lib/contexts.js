import { createContext, useContext, useState, useMemo } from 'react';
import decode from 'jwt-decode';

const AuthContext = createContext({
    user: {},
    login: () => {},
    logout: () => {},
    isLoggedIn: false,
});

const ModalContext = createContext({
    isOpen: false,
    open: () => {},
    close: () => {},
});

export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        if (typeof window === 'undefined') return {};

        const token = localStorage.getItem('token');

        if (!token) return {};

        const { exp = false } = token && decode(token);
        const now = Math.floor(Date.now() / 1000);

        if (now < exp) return { token, ...decode(token) };

        return {};
    });

    const login = (token) => {
        localStorage.setItem('token', token);
        const data = decode(token);
        setUser({ token, ...data });
    };

    const logout = () => {
        localStorage.removeItem('token');
    };

    const isLoggedIn = useMemo(() => {
        if (typeof window === 'undefined') return false;

        const token = localStorage.getItem('token');
        if (!token) return false;

        const { exp = false } = token && decode(token);
        const now = Math.floor(Date.now() / 1000);
        return now < exp;
    }, [user]);

    const value = useMemo(() => ({ user, login, logout, isLoggedIn }), [user, login, logout, isLoggedIn]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const useModal = () => useContext(ModalContext);

export default { AuthProvider, ModalProvider };
