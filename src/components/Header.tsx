'use client';

import React from 'react';
import Link from 'next/link';
import '../styles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">OLX</div>
            <nav className="nav">
                <Link href="/">Home</Link>
                <Link href="/create">Create Product</Link>
            </nav>
        </header>
    );
};

export default Header;
