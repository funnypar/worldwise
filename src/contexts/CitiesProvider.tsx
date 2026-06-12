import { useEffect, useState } from 'react';
import type { ICity } from '../interfaces/ICity';
import {
    createCity,
    deleteCity,
    getCities,
    getCity,
} from '../services/cities.service';
import { CitiesContext } from './CitiesContext';

interface CitiesContextProps {
    children: React.ReactNode;
}

export default function CitiesProvider({ children }: CitiesContextProps) {
    const [cities, setCities] = useState<ICity[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState<ICity | null>(null);

    useEffect(() => {
        async function loadCities() {
            try {
                setIsLoading(true);
                const data: ICity[] = await getCities();
                setCities(data);
            } catch (e) {
                console.error('Failed to fetch cities:', e);
            } finally {
                setIsLoading(false);
            }
        }
        loadCities();
    }, []);

    async function getCityHanlder(id: string | undefined) {
        try {
            setIsLoading(true);
            if (id === undefined) throw new Error('Enter the city ID...');
            const cityData = await getCity(id);
            if (cityData) {
                setCurrentCity(cityData);
            }
        } catch (e) {
            throw new Error('Failed to fetch city:', { cause: e });
        } finally {
            setIsLoading(false);
        }
    }

    async function createCityHandler(newCity: ICity) {
        try {
            setIsLoading(true);
            const data = await createCity(newCity);
            if (data) {
                setCurrentCity(newCity);
                setCities((cities) => [...cities, data]);
            }
        } catch (e) {
            throw new Error('Failed to fetch city:', { cause: e });
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCityHandler(id: string) {
        try {
            setIsLoading(true);
            await deleteCity(id);
            setCities((cities) => cities.filter((city) => city.id !== id));
        } catch (e) {
            throw new Error('Failed to fetch city:', { cause: e });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCityHanlder,
                createCityHandler,
                deleteCityHandler,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}
