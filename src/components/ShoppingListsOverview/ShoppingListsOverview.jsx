import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoppingListsOverview.css';

function ShoppingListsOverview({ shoppingLists, currentUser }) {
    const navigate = useNavigate();

    // Check if currentUser is defined
    if (!currentUser) {
        return <div>Loading user data...</div>;
    }

    // Filter lists to only those where currentUser is a member or the owner
    const visibleLists = shoppingLists.filter(list =>
        list.members.some(member => member.id === currentUser.id) || list.owner.id === currentUser.id
    );

    // Navigate to list detail when a list is clicked
    const goToDetail = (listId) => {
        navigate(`/shopping-list/${listId}`);
    };

    // Check if visibleLists is defined and has length
    if (!visibleLists || visibleLists.length === 0) {
        return <div>No shopping lists found or you are not a member of any lists.</div>;
    }

    return (
        <div className="shopping-list-overview">
            {visibleLists.map((list) => (
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