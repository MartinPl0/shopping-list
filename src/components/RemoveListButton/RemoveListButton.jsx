import React, { useState } from 'react';
import './RemoveListButton.css';

function RemoveListButton({ onConfirmDelete }) {
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        onConfirmDelete();
        setShowModal(false);
    };

    return (
        <>
            <button className="remove-list-button" onClick={handleDeleteClick}>
                Remove List
            </button>
            {showModal && (
                <>
                    <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
                    <div className="modal">
                        <p>Are you sure you want to delete this list?</p>
                        <button onClick={handleConfirmDelete}>Yes, Delete</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </>
            )}
        </>
    );
}

export default RemoveListButton;
