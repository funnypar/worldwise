import type { ICity } from './ICity';

export interface CitiesContextValue {
    cities: ICity[] | null;
    isLoading: boolean;
    currentCity: ICity | null;
    getCityHanlder: (id: string | undefined) => Promise<void>;
    createCityHandler: (newCity: ICity) => Promise<void>;
}
