import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import AppLayout from './pages/AppLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PricingPage from './pages/Pricing';
import Product from './pages/Product';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='product' element={<Product />} />
                <Route path='pricing' element={<PricingPage />} />
                <Route path='app' element={<AppLayout />}>
                    <Route index element={<p>cities</p>} />
                    <Route path='cities' element={<p>hi</p>} />
                    <Route path='countries' element={<p>countries</p>} />
                    <Route path='form' element={<p>form</p>} />
                </Route>
                <Route path='login' element={<Login />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
