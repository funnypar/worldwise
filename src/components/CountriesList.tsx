import useCities from '../hooks/useCities';
import type { country } from '../types/country';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

export default function CountriesList() {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message='Add your first country...' />;

    const countries: country[] = cities.reduce<country[]>((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country)) {
            return [
                ...arr,
                { country: city.country, emoji: city.emoji, id: city.id },
            ];
        }
        return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => {
                return <CountryItem country={country} key={country.id} />;
            })}
        </ul>
    );
}
