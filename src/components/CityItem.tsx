import type { ICity } from '../interfaces/ICity';
import { formatDate } from '../utils/formatDate';
import styles from './CityItem.module.css';

interface cityProps {
    city: ICity;
}

export default function CityItem({ city }: cityProps) {
    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{city.emoji}</span>
            <h3 className={styles.name}>{city.cityName}</h3>
            <time className={styles.date}>{formatDate(city.date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    );
}
