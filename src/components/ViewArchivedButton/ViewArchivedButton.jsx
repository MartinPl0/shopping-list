import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ViewArchivedButton.css';

function ViewArchivedButton() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleClick = () => {
        navigate('/archived');
    };

    return (
        <button className="view-archived-button" onClick={handleClick}>
            {t("View Archived Lists")}
        </button>
    );
}

export default ViewArchivedButton;