import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OverviewRoute.css';
import ShoppingListsOverview from '../../components/ShoppingListsOverview/ShoppingListsOverview';
import AddListButtonComponent from '../../components/AddListButtonComponent/AddListButtonComponent';
import ViewArchivedButton from '../../components/ViewArchivedButton/ViewArchivedButton';

function OverviewRoute({ shoppingLists, setShoppingLists, archivedLists }) {
    const navigate = useNavigate();

    // Function to handle the creation of a new list
    const handleCreateNewList = () => {
        const newListName = prompt("Enter the name for the new list:");
        if (newListName) {
            setShoppingLists(prevLists => [
                ...prevLists,
                { id: Date.now().toString(), name: newListName, items: [], members: [] }
            ]);
        }
    };

    // Function to navigate to the archived lists view
    const handleViewArchivedClick = () => {
        navigate('/archived');
    };

    return (
        <div className="overview-route">
            <h1>Your Shopping Lists</h1>
            <ShoppingListsOverview shoppingLists={shoppingLists} />
            <div className="overview-actions">
                <AddListButtonComponent onCreate={handleCreateNewList} />
                <ViewArchivedButton onClick={handleViewArchivedClick} />
            </div>
        </div>
    );
}

export default OverviewRoute;