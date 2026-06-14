import type { User } from './user';

export type UserAuthActions =
    | { type: 'loading' }
    | { type: 'loaded' }
    | { type: 'logout' }
    | { type: 'login'; payload: User }
    | { type: 'rejected'; payload: string };
