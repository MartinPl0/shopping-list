import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ArchivedRoute.css';
import ArchivedListComponent from '../../components/ArchivedListComponent/ArchivedListComponent';

function ArchivedRoute({ archivedLists, unarchiveList }) {
    const navigate = useNavigate();

    const handleUnarchive = async (listId) => {
        await unarchiveList(listId);
    };

    const handleBackToLists = () => {
        navigate('/overview');
    };

    return (
        <div className="archived-route">
            <h1>Archived Shopping Lists</h1>
            {archivedLists.map(list => (
                <ArchivedListComponent key={list.id} list={list} onUnarchive={handleUnarchive} />
            ))}
            <button onClick={handleBackToLists} className="back-to-lists-button">
                Back to Lists
            </button>
        </div>
    );
}

export default ArchivedRoute;
