import React from 'react';
import './ArchivedListComponent.css';
import ArchivedShoppingListPreview from '../ArchivedShoppingListPreview/ArchivedShoppingListPreview';

function ArchivedListComponent({ list, onUnarchive }) {
    return (
        <div className="archived-list">
            {/* ArchivedShoppingListPreview component to display the list */}
            <ArchivedShoppingListPreview list={list} />
            <button className="archived-list-button" onClick={() => onUnarchive(list.id)}>
                Unarchive
            </button>
        </div>
    );
}

export default ArchivedListComponent;