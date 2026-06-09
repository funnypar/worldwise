import type { ICity } from '../interfaces/ICity';

const BASE_URL = 'http://localhost:8000';

export async function fetchCities(): Promise<ICity[]> {
    try {
        const res = await fetch(`${BASE_URL}/cities`);

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data: ICity[] = await res.json();
        return data;
    } catch (e) {
        console.error('Failed to fetch cities:', e);
        return [];
    }
}
