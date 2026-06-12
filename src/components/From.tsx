import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import useCities from '../hooks/useCities';
import useUrlPosition from '../hooks/useUrlPosition';
import type { ICity } from '../interfaces/ICity';
import { fetchGeoLocationCity } from '../services/geoCodingCities.service';
import { convertToEmoji } from '../utils/convertToEmoji';
import BackButton from './BackButton';
import Button from './Button';
import styles from './Form.module.css';
import Message from './Message';
import Spinner from './Spinner';

export default function From() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [cityName, setCityName] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState<Date | null>(new Date());
    const [notes, setNotes] = useState('');
    const [emoji, setEmoji] = useState('');
    const [lat, lng] = useUrlPosition();

    const { createCityHandler } = useCities();

    useEffect(() => {
        async function fetchCityData() {
            try {
                setError('');
                setIsLoading(true);
                const city = await fetchGeoLocationCity({ lat, lng });
                if (city.city == '') {
                    setError('No city exists there...');
                }
                setCityName(city.city);
                setNotes(
                    city.localityInfo.administrative.filter(
                        (item) => item.name === city.city,
                    )[0].description,
                );
                setEmoji(convertToEmoji(city.countryCode));
                setCountry(city.countryName);
            } catch (error) {
                throw new Error('There is an error to get city...', {
                    cause: error,
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchCityData();
    }, [lat, lng]);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            if (!cityName && !date) return;
            setIsLoading(true);

            const newCity: ICity = {
                cityName: cityName,
                id: Math.random().toString(36).substring(2),
                country: country,
                emoji: emoji,
                date: date!.toString(),
                notes: notes,
                position: { lat: +lat!, lng: +lng! },
            };

            await createCityHandler(newCity);
            navigate('/app/cities');
        } catch (error) {
            setError('An error occurred while trying to submit your city.');
            throw new Error(
                'An error occurred while trying to submit your city.',
                { cause: error },
            );
        } finally {
            setIsLoading(false);
        }
    }

    if (error !== '') return <Message message={error} />;
    if (isLoading) return <Spinner />;
    if (!lat && !lng)
        return <Message message='Start by clicking somewhere on the map.' />;
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
                <DatePicker
                    id='date'
                    selected={date}
                    onChange={(date: Date | null) => {
                        setDate(date);
                    }}
                    dateFormat='dd/MM/yyyy'
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
                <Button variant='primary' type='submit'>
                    Add
                </Button>
                <BackButton />
            </div>
        </form>
    );
}
