import type { User } from '../types/user';

export interface IUserState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string;
}
