'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../layout';

type Category = {
    id: number;
    name: string;
};

const CreateProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchCategories = async () => {
        try {
            const res = await fetch('https://api.escuelajs.co/api/v1/categories');
            if (!res.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            setError('Error fetching categories');
        }
    };

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const newProduct = {
            title,
            price: parseFloat(price),
            description,
            categoryId: parseInt(category),
            images: ["https://placeimg.com/640/480/any"]
        };

        try {
            const res = await fetch('https://api.escuelajs.co/api/v1/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            if (!res.ok) {
                throw new Error('Failed to create product');
            }
            router.push('/');
        } catch (error) {
            setError('Error creating product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="create-product-page">
                <h2>Create Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </Layout>
    );
};

export default CreateProduct;
