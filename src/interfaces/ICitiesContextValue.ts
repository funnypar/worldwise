import type { ICity } from './ICity';

export interface CitiesContextValue {
    cities: ICity[];
    isLoading: boolean;
}
