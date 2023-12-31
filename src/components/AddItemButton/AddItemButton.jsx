import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AddItemButton.css';

function AddItemForm({ onAdd }) {
    const { t } = useTranslation();
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
                        placeholder={t("Enter item name")}
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                    <button type="submit" className="add-item-submit">
                        {t("Submit")}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="cancel-add-item">
                        {t("Cancel")}
                    </button>
                </form>
            ) : (
                <button onClick={() => setShowForm(true)} className="add-item-button">
                    {t("Add Item")}
                </button>
            )}
        </div>
    );
}

export default AddItemForm;