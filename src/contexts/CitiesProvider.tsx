import { useEffect, useState } from 'react';
import type { ICity } from '../interfaces/ICity';
import { fetchCities } from '../services/fetchCities';
import { CitiesContext } from './CitiesContext';

interface CitiesContextProps {
    children: React.ReactNode;
}

export default function CitiesProvider({ children }: CitiesContextProps) {
    const [cities, setCities] = useState<ICity[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadCities() {
            try {
                setIsLoading(true);
                const data: ICity[] = await fetchCities();
                setCities(data);
            } catch (e) {
                console.error('Failed to fetch cities:', e);
            } finally {
                setIsLoading(false);
            }
        }
        loadCities();
    }, []);

    return (
        <CitiesContext.Provider value={{ cities, isLoading }}>
            {children}
        </CitiesContext.Provider>
    );
}
