import type { ICity } from './ICity';

export interface ICitiesState {
    cities: ICity[];
    isLoading: boolean;
    currentCity: ICity | Record<string, never>;
    error: string;
}
