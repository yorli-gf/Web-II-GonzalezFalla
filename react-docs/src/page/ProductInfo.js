import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/ProductInfo.css"; 

export default function ProductInfo() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await res.json();
            setProduct(data);
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p className="loading-text">Loading product details...</p>;

    return (
        <div className="product-info-container">
            <h2 className="product-info-title">{product.title}</h2>
            <img className="product-info-image" src={product.thumbnail} alt={product.title} />
            <p className="product-info-description">{product.description}</p>
            <p className="product-info-price"><strong>Price:</strong> ${product.price}</p>
        </div>

    );
}
