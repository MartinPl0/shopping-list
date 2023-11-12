import React from 'react';
import './Owner.css';

function Owner({ name }) {
    return (
        <div className="owner">
            <span className="owner-label">List owned by:</span> {name}
        </div>
    );
}

export default Owner;