import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import decode from 'jwt-decode';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const modalState = atom({
    key: 'modalState',
    default: false,
});

const authState = atom({
    key: 'authState',
    default: { id: '', email: '', token: '' },
    effects_UNSTABLE: [persistAtom],
});

const openModal = selector({
    key: 'openModal',
    set: ({ set }) => set(modalState, true),
    get: ({ get }) => get(modalState),
});

const closeModal = selector({
    key: 'closeModal',
    set: ({ set }) => set(modalState, false),
    get: ({ get }) => get(modalState),
});

const isLoggedIn = selector({
    key: 'isLoggedIn',
    get: ({ get }) => {
        const { token } = get(authState);

        if (!token) return false;

        const { exp: tokenExpiration } = decode(token);

        const now = Math.floor(Date.now() / 1000);

        if (!tokenExpiration) return false;

        if (now < tokenExpiration) return true;

        return false;
    },
});

export const useModal = () => ({
    isOpen: useRecoilValue(modalState),
    closeModal: useSetRecoilState(closeModal),
    openModal: useSetRecoilState(openModal),
});

export const useAuth = () => ({
    user: useRecoilValue(authState),
    connect: useSetRecoilState(authState),
    isLoggedIn: useRecoilValue(isLoggedIn),
});
