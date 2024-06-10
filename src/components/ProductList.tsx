import React from 'react';
import Link from 'next/link';
import '../styles/ProductList.css';

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

type Props = {
    products: Product[];
};

const ProductList: React.FC<Props> = ({ products }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <Link href={`/${product.id}`}>

                            <img src={product.category.image} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>Price: {product.price}</p>

                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
