import { Link } from 'react-router-dom';
import MyRouters from '../../router/Router';

export default function Menu() {
    const location = useLocation();
    const restringuidos = ["/login"]
    const noExiste = restringuidos.indexOf(location.pathname) === -1;
    return (
        <div className="App">
            {(noExiste && <header className="App-header">
                <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/about">About us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/products">Products</Link></li>
                </ul>
                </nav>  
            </header>
            )}
            <MyRouters/>
        </div>
  )
}

