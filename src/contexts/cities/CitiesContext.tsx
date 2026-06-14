import { createContext } from 'react';
import type { ICitiesContextValue } from '../../interfaces/ICitiesContextValue';

export const CitiesContext = createContext<ICitiesContextValue | undefined>(
    undefined,
);
