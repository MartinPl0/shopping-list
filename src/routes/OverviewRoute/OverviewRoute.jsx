import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OverviewRoute.css';
import ShoppingListsOverview from '../../components/ShoppingListsOverview/ShoppingListsOverview';
import AddListButtonComponent from '../../components/AddListButtonComponent/AddListButtonComponent';
import ViewArchivedButton from '../../components/ViewArchivedButton/ViewArchivedButton';

function OverviewRoute({ shoppingLists, setShoppingLists, archivedLists, currentUser }) {
    const navigate = useNavigate();

    // Function to handle the creation of a new list
    const handleCreateNewList = (listName) => {
        if (listName) {
            const newList = {
                id: Date.now().toString(),
                name: listName,
                items: [],
                members: [{ }], 
                owner: { id: currentUser.id, name: currentUser.name } // Set owner property
            };
            setShoppingLists(prevLists => [...prevLists, newList]);
        }
    };

    // Function to navigate to the archived lists view
    const handleViewArchivedClick = () => {
        navigate('/archived');
    };

    return (
        <div className="overview-route">
            <h1>Your Shopping Lists</h1>
            <ShoppingListsOverview shoppingLists={shoppingLists} currentUser={currentUser} />
            <div className="overview-actions">
                <AddListButtonComponent onCreate={handleCreateNewList} />
                <ViewArchivedButton onClick={handleViewArchivedClick} />
            </div>
        </div>
    );
}

export default OverviewRoute;