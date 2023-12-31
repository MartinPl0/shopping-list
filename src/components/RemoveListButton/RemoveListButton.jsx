import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './RemoveListButton.css';

function RemoveListButton({ onConfirmDelete }) {
    const { t } = useTranslation();
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
                {t("Remove List")}
            </button>
            {showModal && (
                <>
                    <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
                    <div className="modal">
                        <p>{t("Are you sure you want to delete this list?")}</p>
                        <button onClick={handleConfirmDelete}>{t("Yes, Delete")}</button>
                        <button onClick={() => setShowModal(false)}>{t("Cancel")}</button>
                    </div>
                </>
            )}
        </>
    );
}

export default RemoveListButton;
