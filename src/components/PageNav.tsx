import { Link } from 'react-router-dom';

export default function PageNav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                    <Link to='/pricing'>Pricing</Link>
                    <Link to='/product'>Product</Link>
                </li>
            </ul>
        </nav>
    );
}
