import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './User.module.css';

export default function User() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    async function handleClick() {
        await logout();
        navigate('/');
    }

    return (
        <div className={styles.user}>
            <img src={user?.avatar} alt={user?.name} />
            <span>Welcome, {user?.name}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}
