import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import City from './components/City';
import CityList from './components/CityList';
import CountriesList from './components/CountriesList';
import From from './components/From';
import CitiesProvider from './contexts/cities/CitiesProvider';
import './index.css';
import AppLayout from './pages/AppLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PricingPage from './pages/Pricing';
import Product from './pages/Product';

export default function App() {
    return (
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage />} />
                    <Route path='product' element={<Product />} />
                    <Route path='pricing' element={<PricingPage />} />
                    <Route path='app' element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to='cities' />}
                        />
                        <Route path='cities' element={<CityList />} />
                        <Route path='cities/:id' element={<City />} />
                        <Route path='countries' element={<CountriesList />} />
                        <Route path='form' element={<From />} />
                    </Route>
                    <Route path='login' element={<Login />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    );
}
