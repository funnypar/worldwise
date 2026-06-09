import styles from './CountryItem.module.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CountryItem({ country }: any) {
    return (
        <li className={styles.countryItem}>
            <span>{country.emoji}</span>
            <span>{country.country}</span>
        </li>
    );
}
