import React from 'react';
import './AddListButtonComponent.css';

function AddListButtonComponent({ onCreate }) {
    return (
        <button className="add-list-button" onClick={onCreate}>
            Create New List
        </button>
    );
}

export default AddListButtonComponent;
