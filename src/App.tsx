import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CityList from './components/CityList';
import CountriesList from './components/CountriesList';
import './index.css';
import type { ICity } from './interfaces/ICity';
import AppLayout from './pages/AppLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PricingPage from './pages/Pricing';
import Product from './pages/Product';
import { fetchCities } from './services/fetchCities';

export default function App() {
    const [cities, setCities] = useState<ICity[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadCities() {
            try {
                setIsLoading(true);
                const data: ICity[] = await fetchCities();
                setCities(data);
            } catch (e) {
                console.error('Failed to fetch cities:', e);
            } finally {
                setIsLoading(false);
            }
        }

        loadCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='product' element={<Product />} />
                <Route path='pricing' element={<PricingPage />} />
                <Route path='app' element={<AppLayout />}>
                    <Route
                        index
                        element={
                            <CityList cities={cities} isLoading={isLoading} />
                        }
                    />
                    <Route
                        path='cities'
                        element={
                            <CityList cities={cities} isLoading={isLoading} />
                        }
                    />
                    <Route
                        path='countries'
                        element={
                            <CountriesList
                                cities={cities}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route path='form' element={<p>form</p>} />
                </Route>
                <Route path='login' element={<Login />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
