import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarComponent.css';

function NavbarComponent({ currentUser }) {
    return (
        <nav className="navbar">
            {/* Use Link to wrap the title */}
            <Link to="/" className="navbar-brand">Shopping List App</Link>
            <div className="navbar-user">Welcome, {currentUser.name}!</div>
        </nav>
    );
}

export default NavbarComponent;
