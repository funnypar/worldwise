import type { User } from '../types/user';

export interface IUserAuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
