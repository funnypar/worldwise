import { FAKE_USER } from '../constant/fakeUser';
import styles from './User.module.css';

export default function User() {
    const user = FAKE_USER;

    function handleClick() {}

    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}
