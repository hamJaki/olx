'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../layout';

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        image: string;
        name: string;
    };
};

export default function ProductDetail() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const { id } = params;

    useEffect(() => {
        if (id) {
            fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch product');
                    }
                    return res.json();
                })
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading product: {error}</p>;

    return (
        <Layout>
            <div className="product-page">
                {product && (
                    <div key={product.id} className="product">
                        <h2>{product.title}</h2>
                        <img src={product.category.image} alt={product.title} />
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
