import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewArchivedButton.css';

function ViewArchivedButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/archived');
    };

    return (
        <button className="view-archived-button" onClick={handleClick}>
            View Archived Lists
        </button>
    );
}

export default ViewArchivedButton;