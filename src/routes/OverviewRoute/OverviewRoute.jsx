import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './OverviewRoute.css';
import ShoppingListsOverview from '../../components/ShoppingListsOverview/ShoppingListsOverview';
import AddListButtonComponent from '../../components/AddListButtonComponent/AddListButtonComponent';
import ViewArchivedButton from '../../components/ViewArchivedButton/ViewArchivedButton';

function OverviewRoute({ allLists, fetchLists, createNewList, currentUser }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        fetchLists();  // Call the fetchLists function passed from App.js
    }, [fetchLists, currentUser.id]);

    // Function to handle the creation of a new list
    const handleCreateNewList = async (listName) => {
        if (listName) {
            await createNewList(listName, t("Description")); // Call the function from props
        }
    };

    // Function to navigate to the archived lists view
    const handleViewArchivedClick = () => {
        navigate('/archived');
    };

    return (
        <div className="overview-route">
            <h1>{t("Your Shopping Lists")}</h1>
            <ShoppingListsOverview
                shoppingLists={allLists ? allLists.filter(list => !list.isArchived).map(list => ({
                    ...list,
                    itemCount: list.items ? list.items.length : 0
                })) : []}
                currentUser={currentUser}
            />
            <div className="overview-actions">
                <AddListButtonComponent onCreate={handleCreateNewList} />
                <ViewArchivedButton onClick={handleViewArchivedClick} />
            </div>
        </div>
    );
}

export default OverviewRoute;