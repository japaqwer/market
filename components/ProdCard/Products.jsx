import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = () => {
            const url = 'http://51.20.95.11:8000/api/v1/products/';
            axios
                .get(url, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
                    },
                })
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price} USD</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
