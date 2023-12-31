import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AddListButtonComponent.css';

function AddListButtonComponent({ onCreate }) {
    const [showModal, setShowModal] = useState(false);
    const [newListName, setNewListName] = useState('');
    const { t } = useTranslation();

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
                {t("Create New List")}
            </button>
            {showModal && (
                <>
                    <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
                    <div className="modal">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newListName">{t("List Name:")}</label>
                        <input
                            type="text"
                            id="newListName"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                        <button type="submit">{t("Create")}</button>
                        <button type="button" onClick={() => setShowModal(false)}>{t("Cancel")}</button>
                    </form>
                    </div>
                </>
            )}
        </>
    );
}

export default AddListButtonComponent;