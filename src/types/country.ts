import type { ICity } from '../interfaces/ICity';

export type Country = Pick<ICity, 'country' | 'emoji' | 'id'>;
