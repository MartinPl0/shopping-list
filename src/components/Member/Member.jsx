import React from 'react';
import './Member.css';

function Member({ name, onRemove }) {
    return (
        <div className="member">
            <span className="member-name">{name}</span>
            <button className="member-remove" onClick={onRemove}>
                Remove
            </button>
        </div>
    );
}

export default Member;