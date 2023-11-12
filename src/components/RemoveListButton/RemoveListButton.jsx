import React from 'react';
import './RemoveListButton.css';

function RemoveListButton({ onClick }) {
    return (
        <button className="remove-list-button" onClick={onClick}>
            Remove List
        </button>
    );
}

export default RemoveListButton;