import { createContext } from 'react';
import type { CitiesContextValue } from '../interfaces/ICitiesContextValue';

export const CitiesContext = createContext<CitiesContextValue | undefined>(
    undefined,
);
