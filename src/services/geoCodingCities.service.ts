import type { IGeoLocationCity } from '../interfaces/IGeoLocationCity';

interface fetchGeoLocationCityProps {
    lat: string | null;
    lng: string | null;
}

export async function fetchGeoLocationCity({
    lat,
    lng,
}: fetchGeoLocationCityProps) {
    if (!lat || !lng) throw new Error('Coordinates are required');

    try {
        const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        );
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data: IGeoLocationCity = await res.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch city from coordinates', {
            cause: error,
        });
    }
}
