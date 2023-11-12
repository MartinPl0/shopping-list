import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingListsOverview.css';

function ShoppingListsOverview({ shoppingLists }) {
    const navigate = useNavigate();

    // Navigate to list detail when a list is clicked
    const goToDetail = (listId) => {
        navigate(`/shopping-list/${listId}`);
    };

    // Check if shoppingLists is defined and has length
    if (!shoppingLists || shoppingLists.length === 0) {
        return <div>No shopping lists found.</div>;
    }

    return (
        <div className="shopping-list-overview">
            {shoppingLists.map((list) => (
                <div
                    key={list.id}
                    className="shopping-list-preview"
                    onClick={() => goToDetail(list.id)}
                >
                    <h3 className="list-name">{list.name}</h3>
                    <ul className="item-preview">
                        {list.items.slice(0, 3).map((item) => (
                            <li key={item.id} className="item-name">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                    {/* Add more details if needed */}
                </div>
            ))}
        </div>
    );
}

export default ShoppingListsOverview;