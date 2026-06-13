import type { ICity } from '../interfaces/ICity';

export type CitiesActions =
    | { type: 'loading' }
    | { type: 'loaded' }
    | { type: 'city/loaded'; payload: ICity }
    | { type: 'cities/loaded'; payload: ICity[] }
    | { type: 'city/created'; payload: ICity }
    | { type: 'cities/deleted'; payload: string }
    | { type: 'rejected'; payload: string };
