import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

export default function Map() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const lat: string = searchParams.get('lat');
    const lng: string = searchParams.get('lng');

    return (
        <div className={styles.mapContainer} onClick={() => navigate('form')}>
            Map
        </div>
    );
}
