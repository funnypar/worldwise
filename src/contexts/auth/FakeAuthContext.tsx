import { createContext } from 'react';
import type { IUserAuthContextValue } from '../../interfaces/IUserAuthContextValue';

export const FakeAuthContext = createContext<IUserAuthContextValue | undefined>(
    undefined,
);
