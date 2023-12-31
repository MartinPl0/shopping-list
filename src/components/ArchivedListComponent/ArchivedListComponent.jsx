import React from 'react';
import { useTranslation } from 'react-i18next';
import './ArchivedListComponent.css';
import ArchivedShoppingListPreview from '../ArchivedShoppingListPreview/ArchivedShoppingListPreview';

function ArchivedListComponent({ list, onUnarchive }) {
    const { t } = useTranslation();

    return (
        <div className="archived-list">
            {/* ArchivedShoppingListPreview component to display the list */}
            <ArchivedShoppingListPreview list={list} />
            <button className="archived-list-button" onClick={() => onUnarchive(list.id)}>
                {t('Unarchive')}
            </button>
        </div>
    );
}

export default ArchivedListComponent;