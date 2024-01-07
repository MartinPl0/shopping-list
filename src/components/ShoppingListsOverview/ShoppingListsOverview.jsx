import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ShoppingListsOverview.css';

function ShoppingListsOverview({ shoppingLists, currentUser }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Check if currentUser is defined
    if (!currentUser) {
        return <div>{t("Loading user data...")}</div>;
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
        return <div>{t("No shopping lists found or you are not a member of any lists.")}</div>;
    }

    function getPluralKey(count) {
        if (count === 1) {
            return "item_0"; // Singular
        } else if (count >= 2 && count <= 4) {
            return "item_1"; // 2-4 items
        } else {
            return "item_2"; // 5 and more items
        }
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
                    <div className="item-count">
                        {list.itemCount} {t(getPluralKey(list.itemCount))}
                    </div>
                    <ul className="item-preview">
                        {list.items.slice(0, 5).map((item) => (
                            <li key={item.id} className="item-name">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default ShoppingListsOverview;