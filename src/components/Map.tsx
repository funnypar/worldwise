import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

export default function Map() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState<[number, number]>([
        51.505, -0.09,
    ]);

    const lat: string | null = searchParams.get('lat');
    const lng: string | null = searchParams.get('lng');

    if (lat && lng) {
        setMapPosition([+lat, +lng]);
    }

    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
            <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                />
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
