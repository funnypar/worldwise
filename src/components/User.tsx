import type { User } from '../types/user';
import styles from './User.module.css';

const FAKE_USER: User = {
    name: 'Jack',
    email: 'jack@example.com',
    password: 'qwerty',
    avatar: 'https://i.pravatar.cc/100?u=zz',
};

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
