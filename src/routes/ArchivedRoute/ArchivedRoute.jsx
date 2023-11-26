import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ArchivedRoute.css';
import ArchivedListComponent from '../../components/ArchivedListComponent/ArchivedListComponent';

function ArchivedRoute({ archivedLists, unarchiveList }) {
    const [localArchivedLists, setLocalArchivedLists] = useState(archivedLists);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleUnarchive = (listId) => {
        // Remove the list from local state for instant UI update
        setLocalArchivedLists(currentLists => 
            currentLists.filter(list => list.id !== listId)
        );
        // Call the prop function to handle unarchiving (it won't update the UI until refresh)
        unarchiveList(listId);
    };

    const handleBackToLists = () => {
        navigate('/overview'); // Navigate back to the overview route
    };

    return (
        <div className="archived-route">
            <h1>Archived Shopping Lists</h1>
            {localArchivedLists.map(list => (
                <ArchivedListComponent key={list.id} list={list} onUnarchive={handleUnarchive} />
            ))}
            <div className="back-to-lists-wrapper"> {/* Add this wrapper */}
                <button onClick={handleBackToLists} className="back-to-lists-button">
                    Back to Lists
                </button>
            </div>
        </div>
    );
}

export default ArchivedRoute;
