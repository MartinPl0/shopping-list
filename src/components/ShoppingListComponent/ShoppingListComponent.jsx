import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingListComponent.css';

function ShoppingListComponent({ list, onDelete, onArchive }) {
    const navigate = useNavigate();

    // Navigate to list detail
    const goToDetail = () => {
        navigate(`/shopping-list/${list.id}`);
    };

    // Delete list
    const handleDelete = () => {
        onDelete(list.id);
    };

    // Archive list
    const handleArchive = () => {
        onArchive(list.id);
    };

    return (
        <div className="shopping-list">
            <div onClick={goToDetail}>
                <h3>{list.name}</h3>
                {/* ... display list items ... */}
            </div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleArchive}>Archive</button>
        </div>
    );
}

export default ShoppingListComponent;
