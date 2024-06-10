'use client';

import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import Layout from './layout';

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

export default function Home() {
    const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('https://api.escuelajs.co/api/v1/products');
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                setFetchedProducts(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Layout>
            <div className="container">
                <ProductList products={fetchedProducts} />
            </div>
        </Layout>
    );
}
