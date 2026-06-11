import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCities from '../hooks/useCities';
import { formatDate } from '../utils/formatDate';
import BackButton from './BackButton';
import styles from './City.module.css';
import Spinner from './Spinner';

export default function City() {
    const { id } = useParams();

    const { getCityHanlder, currentCity, isLoading } = useCities();

    useEffect(() => {
        getCityHanlder(id);
    }, [id]);

    if (isLoading) return <Spinner />;

    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name</h6>
                <h3>
                    <span>{currentCity?.emoji}</span> {currentCity?.cityName}
                </h3>
            </div>

            <div className={styles.row}>
                <h6>You went to {currentCity?.cityName} on</h6>
                <p>{formatDate(currentCity?.date || null)}</p>
            </div>

            {currentCity?.notes && (
                <div className={styles.row}>
                    <h6>Your notes</h6>
                    <p>{currentCity.notes}</p>
                </div>
            )}

            <div className={styles.row}>
                <h6>Learn more</h6>
                <a
                    href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    Check out {currentCity?.cityName} on Wikipedia &rarr;
                </a>
            </div>

            <div>
                <BackButton />
            </div>
        </div>
    );
}
