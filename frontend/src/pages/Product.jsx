import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Product.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    // Fetch all product data from the API
    const loadProducts = () => {
        const api = "http://localhost:7000/books/datadisplay";
        axios.get(api).then((res) => {
            setProducts(res.data);
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div className="product-page-container">
            <h1>Our Products</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        {product.image && (
                            <img
                                src={`data:image/png;base64,${product.image}`}
                                alt={product.book_title}
                                className="product-image"
                            />
                        )}
                        <div className="product-details">
                            <h3>{product.book_title}</h3>
                            <p><strong>Author:</strong> {product.author_name}</p>
                            <p><strong>Publish Year:</strong> {new Date(product.publish_year).toLocaleDateString()}</p>
                            <p><strong>Price:</strong> ₹{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
