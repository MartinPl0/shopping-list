import React, { useState } from 'react';
import './AddItemButton.css';

function AddItemForm({ onAdd }) {
    const [itemName, setItemName] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        onAdd(itemName); // Pass only the item name
        setItemName(''); // Reset the input field
        setShowForm(false); // Hide the form again
    };

    return (
        <div className="add-item-form">
            {showForm ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter item name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                    <button type="submit" className="add-item-submit">
                        Submit
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="cancel-add-item">
                        Cancel
                    </button>
                </form>
            ) : (
                <button onClick={() => setShowForm(true)} className="add-item-button">
                    Add Item
                </button>
            )}
        </div>
    );
}

export default AddItemForm;