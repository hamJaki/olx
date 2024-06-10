import { ReactNode } from 'react';
import Header from '../components/Header';
import '../styles/globals.css';
import '../styles/Header.css';
import '../styles/ProductList.css';
import '../styles/ProductDetail.css';
import '../styles/CreateProduct.css';

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <html lang="en">
        <body>
        <Header />
        <main>{children}</main>
        </body>
        </html>
    );
}
