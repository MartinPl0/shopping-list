import React, { useState } from 'react';
import './ArchivedRoute.css';
import ArchivedListComponent from '../../components/ArchivedListComponent/ArchivedListComponent';

function ArchivedRoute({ archivedLists, unarchiveList }) {
    const [localArchivedLists, setLocalArchivedLists] = useState(archivedLists);

    const handleUnarchive = (listId) => {
        // Remove the list from local state for instant UI update
        setLocalArchivedLists(currentLists => 
            currentLists.filter(list => list.id !== listId)
        );
        // Call the prop function to handle unarchiving (it won't update the UI until refresh)
        unarchiveList(listId);
    };

    return (
        <div className="archived-route">
            <h2>Archived Shopping Lists</h2>
            {localArchivedLists.map(list => (
                <ArchivedListComponent key={list.id} list={list} onUnarchive={handleUnarchive} />
            ))}
        </div>
    );
}

export default ArchivedRoute;
