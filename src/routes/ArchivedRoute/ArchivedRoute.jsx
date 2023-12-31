import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ArchivedRoute.css';
import ArchivedListComponent from '../../components/ArchivedListComponent/ArchivedListComponent';

function ArchivedRoute({ archivedLists, unarchiveList, fetchLists }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleUnarchive = async (listId) => {
        await unarchiveList(listId);
        fetchLists(); // Re-fetch all lists to update the state
    };

    const handleBackToLists = () => {
        navigate('/overview');
    };

    return (
        <div className="archived-route">
            <h1>{t('Archived Shopping Lists')}</h1>
            <div className="archived-lists-container">
                {archivedLists.map(list => (
                    <div key={list.id} className="archived-list-component">
                        <ArchivedListComponent list={list} onUnarchive={handleUnarchive} />
                    </div>
                ))}
            </div>
            <button onClick={handleBackToLists} className="back-to-lists-button">
                {t('Back to Lists')}
            </button>
        </div>
    );
}

export default ArchivedRoute;
