import { useContext } from 'react';
import { FakeAuthContext } from '../contexts/auth/FakeAuthContext';

export function useAuth() {
    const context = useContext(FakeAuthContext);
    if (context === undefined)
        throw new Error('AuthContext was used outside AuthProvier.');
    return context;
}
