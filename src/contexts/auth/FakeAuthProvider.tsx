import { useReducer } from 'react';
import { FAKE_USER } from '../../constant/fakeUser';
import type { IUserState } from '../../interfaces/IUserState';
import type { UserAuthActions } from '../../types/userAuthActions';
import { FakeAuthContext } from './FakeAuthContext';

const initialState = {
    user: null,
    isAuthenticated: false,
    error: '',
    isLoading: false,
};

function reducer(state: IUserState, action: UserAuthActions): IUserState {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true };
        case 'loaded':
            return { ...state, isLoading: false };
        case 'login':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'logout':
            return { ...state, ...initialState };
        case 'rejected':
            return { ...state, isLoading: false, error: action.payload };
        default:
            throw new Error('Unknown Action');
    }
}

interface UserAuthContextProps {
    children: React.ReactNode;
}

export default function FakeAuthProvider({ children }: UserAuthContextProps) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState,
    );

    async function login(email: string, password: string) {
        const user = FAKE_USER;
        if (email === user.email && password === user.password) {
            dispatch({ type: 'login', payload: user });
        }
    }

    async function logout() {
        dispatch({ type: 'logout' });
    }

    return (
        <FakeAuthContext.Provider
            value={{ user, isAuthenticated, login, logout }}
        >
            {children}
        </FakeAuthContext.Provider>
    );
}
