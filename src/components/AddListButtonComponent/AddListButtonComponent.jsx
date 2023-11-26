import React, { useState } from 'react';
import './AddListButtonComponent.css';

function AddListButtonComponent({ onCreate }) {
    const [showModal, setShowModal] = useState(false);
    const [newListName, setNewListName] = useState('');

    const handleCreateClick = () => {
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(newListName);
        setNewListName('');
        setShowModal(false);
    };

    return (
        <>
            <button className="add-list-button" onClick={handleCreateClick}>
                Create New List
            </button>
            {showModal && (
                <>
                    <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
                    <div className="modal">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newListName">List Name:</label>
                        <input
                            type="text"
                            id="newListName"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                        <button type="submit">Create</button>
                        <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                    </form>
                    </div>
                </>
            )}
        </>
    );
}

export default AddListButtonComponent;
