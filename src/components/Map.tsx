import { useState } from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
} from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useCities from '../hooks/useCities';
import styles from './Map.module.css';

export default function Map() {
    const { cities } = useCities();
    const [searchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState<[number, number]>([
        51.505, -0.09,
    ]);

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (lat && lng && (+lat !== mapPosition[0] || +lng !== mapPosition[1])) {
        setMapPosition([+lat, +lng]);
    }

    return (
        <div className={styles.mapContainer}>
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                />
                {cities?.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>{' '}
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

interface MapProps {
    position: [number, number];
}

function ChangeCenter({ position }: MapProps) {
    const map = useMap();

    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
    return null;
}
