import '../style/products.css'
import ProductItem from '../components/ProductItem'
import { useNavigate } from 'react-router-dom';

export default function Products(){
    const hasTokenInLocalStorage = localStorage.getItem("token") != null;
    const navigate = useNavigate

    if(!hasTokenInLocalStorage) {
        window.location.href = "/login"
        return; 
    }
    return (
        <div>
            <div className='container-products'>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </div>
    )
}