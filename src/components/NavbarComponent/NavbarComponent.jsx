import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NavbarComponent.css';
import { FaMoon, FaSun } from 'react-icons/fa';

function NavbarComponent({ currentUser, toggleTheme, currentTheme }) {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                {/* Use Link to wrap the title */}
                <Link to="/" className="navbar-brand">Shopping List App</Link>
            </div>
            <div className="navbar-center">
                <div className="navbar-user">{t('Welcome')}, {currentUser.name}!</div>
            </div>
            <div className="navbar-right">
                {/* Add a dropdown to switch language */}
                <select onChange={(e) => changeLanguage(e.target.value)} className="navbar-language">
                    <option value="en">{t('English')}</option>
                    <option value="cs">{t('Czech')}</option>
                </select>
                {/* Add a button to toggle the theme */}
                <button onClick={toggleTheme} className="navbar-theme-toggle">
                    {currentTheme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
            </div>
        </nav>
    );
}

export default NavbarComponent;