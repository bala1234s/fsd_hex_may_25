import React from 'react';

function Header() {
    return (
        <header className="header">
            <h1>Customer Dashboard</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/policies">Policies</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;