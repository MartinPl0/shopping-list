import React from 'react';
import './ListItemsDetail.css';

function ListItemDetail({ item, onItemStatusChange, onRemoveItem }) {
    // Change item status
    const handleStatusChange = () => {
        onItemStatusChange(item.id);
    };

    // Remove item
    const handleRemove = () => {
        onRemoveItem(item.id);
    };

    return (
        <div className="list-item-detail">
            <input
                type="checkbox"
                checked={item.isCompleted}
                onChange={handleStatusChange}
            />
            <span className={`item-name ${item.isCompleted ? 'item-resolved' : ''}`}>
                {item.name}
            </span>
            <button onClick={handleRemove} className="remove-item">Remove</button>
        </div>
    );
}

export default ListItemDetail;