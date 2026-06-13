import { useEffect, useReducer } from 'react';
import type { ICitiesState } from '../interfaces/ICitiesState';
import type { ICity } from '../interfaces/ICity';
import {
    createCity,
    deleteCity,
    getCities,
    getCity,
} from '../services/cities.service';
import type { CitiesActions } from '../types/citiesActions';
import { CitiesContext } from './CitiesContext';

interface CitiesContextProps {
    children: React.ReactNode;
}

const intialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
};

function reducer(state: ICitiesState, action: CitiesActions): ICitiesState {
    switch (action.type) {
        case 'loading':
            return { ...state, isLoading: true };
        case 'loaded':
            return { ...state, isLoading: false };
        case 'city/loaded':
            return { ...state, isLoading: false, currentCity: action.payload };
        case 'cities/loaded':
            return { ...state, isLoading: false, cities: action.payload };
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
            };
        case 'cities/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city: ICity) => city.id !== action.payload,
                ),
            };
        case 'rejected':
            return { ...state, error: action.payload };
        default:
            throw new Error('Unknown action type');
    }
}

export default function CitiesProvider({ children }: CitiesContextProps) {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
        reducer,
        intialState,
    );

    useEffect(() => {
        async function loadCities() {
            try {
                dispatch({ type: 'loading' });
                const data: ICity[] = await getCities();
                dispatch({ type: 'cities/loaded', payload: data });
            } catch (e) {
                dispatch({
                    type: 'rejected',
                    payload: `Failed to fetch cities: ${e}`,
                });
            } finally {
                dispatch({ type: 'loaded' });
            }
        }
        loadCities();
    }, []);

    async function getCityHanlder(id: string | undefined) {
        try {
            dispatch({ type: 'loading' });
            if (id === undefined) throw new Error('Enter the city ID...');
            const cityData = await getCity(id);
            if (cityData) {
                dispatch({ type: 'city/loaded', payload: cityData });
            }
        } catch (e) {
            dispatch({
                type: 'rejected',
                payload: `Failed to fetch city: ${e}`,
            });
        } finally {
            dispatch({ type: 'loaded' });
        }
    }

    async function createCityHandler(newCity: ICity) {
        try {
            dispatch({ type: 'loading' });
            const data = await createCity(newCity);
            if (data) {
                dispatch({ type: 'city/loaded', payload: newCity });
                dispatch({ type: 'city/created', payload: newCity });
            }
        } catch (e) {
            dispatch({
                type: 'rejected',
                payload: `Failed to create city: ${e}`,
            });
        } finally {
            dispatch({ type: 'loaded' });
        }
    }

    async function deleteCityHandler(id: string) {
        try {
            dispatch({ type: 'loading' });
            const res = await deleteCity(id);
            if (res) dispatch({ type: 'cities/deleted', payload: id });
        } catch (e) {
            dispatch({
                type: 'rejected',
                payload: `Failed to delete city: ${e}`,
            });
        } finally {
            dispatch({ type: 'loaded' });
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
