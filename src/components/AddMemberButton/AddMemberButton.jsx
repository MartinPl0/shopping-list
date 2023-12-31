import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AddMemberButton.css'; 

function AddMemberButton({ onAdd, allUsers }) {
    const { t } = useTranslation();
    const [memberName, setMemberName] = useState('');
    const [setErrorMessage] = useState('');

    const handleAddClick = () => {
        const user = allUsers.find(u => u.name.toLowerCase() === memberName.toLowerCase());
        if (user) {
            onAdd(user.id); // Pass the user ID
            setErrorMessage(''); 
        } else {
            setErrorMessage(t("User not found"));
        }
        setMemberName('');
    };

    return (
        <div className="add-member-container">
            <input
                className="add-member-input"
                type="text"
                placeholder={t("Enter member name")}
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
            />
            <button className="add-member-button" onClick={handleAddClick}>{t("Add Member")}</button>
        </div>
    );
}

export default AddMemberButton;