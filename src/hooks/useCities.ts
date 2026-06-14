import { useContext } from 'react';
import { CitiesContext } from '../contexts/cities/CitiesContext';
import type { CitiesContextValue } from '../interfaces/ICitiesContextValue';

export default function useCities(): CitiesContextValue {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error('Cities Context was used outside the CitiesProvider.');
    }
    return context;
}
