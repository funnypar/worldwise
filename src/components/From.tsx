import { useEffect, useState } from 'react';
import useUrlPosition from '../hooks/useUrlPosition';
import { fetchGeoLocationCity } from '../services/geoCodingCities.service';
import { convertToEmoji } from '../utils/convertToEmoji';
import BackButton from './BackButton';
import Button from './Button';
import styles from './Form.module.css';
import Message from './Message';
import Spinner from './Spinner';

export default function From() {
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [ErrorGeocoding, setErrorGeocoding] = useState('');

    const [cityName, setCityName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');
    const [emoji, setEmoji] = useState('');
    const [lat, lng] = useUrlPosition();

    useEffect(() => {
        async function fetchCityData() {
            try {
                setErrorGeocoding('');
                setIsLoadingGeocoding(true);
                const city = await fetchGeoLocationCity({ lat, lng });
                if (city.city == '') {
                    setErrorGeocoding('No city exists there...');
                }
                setCityName(city.city);
                setNotes(
                    city.localityInfo.administrative.filter(
                        (item) => item.name === city.city,
                    )[0].description,
                );
                setEmoji(convertToEmoji(city.countryCode));
            } catch (error) {
                throw new Error('There is an error to get city...', {
                    cause: error,
                });
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, [lat, lng]);

    if (ErrorGeocoding !== '') return <Message message={ErrorGeocoding} />;
    if (isLoadingGeocoding) return <Spinner />;
    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor='cityName'>City name</label>
                <input
                    id='cityName'
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor='date'>When did you go to {cityName}?</label>
                <input
                    id='date'
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor='notes'>
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id='notes'
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button variant='primary'>Add</Button>
                <BackButton />
            </div>
        </form>
    );
}
