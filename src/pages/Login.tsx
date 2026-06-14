import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import styles from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const [email, setEmail] = useState('mopano@example.com');
    const [password, setPassword] = useState('mopano');

    useEffect(() => {
        if (isAuthenticated === true) navigate('/app', { replace: true });
    }, [isAuthenticated, navigate]);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (email && password) await login(email, password);
    }

    return (
        <main className={styles.login}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor='email'>Email address</label>
                    <input
                        type='email'
                        id='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type='submit'>Login</Button>
                </div>
            </form>
        </main>
    );
}
