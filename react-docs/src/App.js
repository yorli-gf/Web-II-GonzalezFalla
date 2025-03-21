import './App.css';
import { Link } from 'react-router-dom';
import MyRouters from './router/Router';

function App() {
  return (
    <div className="App">
      <header>
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
      {/* <MyFirstComponent />

      <UserContextProvider>
        <Form />
        <Profile />
      </UserContextProvider> */}
      <MyRouters/>
    </div>
  );
}

export default App;
