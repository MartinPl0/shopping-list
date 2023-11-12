import React, { useState } from 'react';
import './AddMemberButton.css'; 

function AddMemberButton({ onAdd }) {
    const [memberName, setMemberName] = useState('');

    const handleAddClick = () => {
        onAdd(memberName);
        setMemberName('');
    };

    return (
        <div className="add-member-container">
            <input
                className="add-member-input"
                type="text"
                placeholder="Enter member name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
            />
            <button className="add-member-button" onClick={handleAddClick}>Add Member</button>
        </div>
    );
}

export default AddMemberButton;
