import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type props = {
    children: ReactNode;
};
export default function ProtectedRoute({ children }: props) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/');
    }, [navigate, isAuthenticated]);
    return isAuthenticated ? children : null;
}
