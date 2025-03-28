import { useNavigate } from "react-router-dom";
import "../style/products.css";

export default function ProductItem({ title, id, description, images }) {
    const navigate = useNavigate();

    const image = images?.[0] ?? "https://imgs.search.brave.com/ti7F41pW3oNrqH6FqBXQEqUEzFDnl1Wf-F8YtVViYTU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2luZGV4L3Byb2R1/Y3QtaW1hZ2Utb25l/LndlYnA";

    const handleClick = () => {
        navigate(`/products/${id}`);
    };

    return (
        <div className="product-list-item" key={id} onClick={handleClick}>
            <div className="product-list-image">
                <img loading="lazy" src={image} alt="product-image" />
            </div>
            <div className="product-list-details">
                <div className="product-list-container-details">
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}
