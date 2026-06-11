import { Link } from 'react-router-dom';
import useCities from '../hooks/useCities';
import type { ICity } from '../interfaces/ICity';
import { formatDate } from '../utils/formatDate';
import styles from './CityItem.module.css';

interface cityProps {
    city: ICity;
}

export default function CityItem({ city }: cityProps) {
    const { currentCity } = useCities();
    return (
        <li>
            <Link
                to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
                className={`${styles.cityItem} ${city.id == currentCity?.id ? styles['cityItem--active'] : ''}`}
            >
                <span className={styles.emoji}>{city.emoji}</span>
                <h3 className={styles.name}>{city.cityName}</h3>
                <time className={styles.date}>{formatDate(city.date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}
