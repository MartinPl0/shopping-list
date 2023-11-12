import React from 'react';
import './ArchivedShoppingListPreview.css';

function ArchivedShoppingListPreview({ list }) {
    return (
        <div className="archived-list-preview">
            <div className="archived-list-info">
                <h3 className="archived-list-title">{list.name}</h3>
                <ul className="archived-list-items">
                    {list.items.map((item) => (
                        <li key={item.id} className="archived-list-item">
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ArchivedShoppingListPreview;
