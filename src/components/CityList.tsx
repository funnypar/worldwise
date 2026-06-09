import type { ICity } from '../interfaces/ICity';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

interface CityListProps {
    cities: ICity[];
    isLoading: boolean;
}

export default function CityList({ cities, isLoading }: CityListProps) {
    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message='Add your first city...' />;
    return (
        <ul className={styles.cityList}>
            {cities.map((city) => {
                return <CityItem city={city} key={city.id} />;
            })}
        </ul>
    );
}
