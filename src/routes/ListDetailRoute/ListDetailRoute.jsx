import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MembersSection from '../../components/MembersSection/MembersSection';
import ListItemsDetail from '../../components/ListItemsDetail/ListItemsDetail';
import AddItemButton from '../../components/AddItemButton/AddItemButton';
import Owner from '../../components/Owner/Owner';
import RemoveListButton from '../../components/RemoveListButton/RemoveListButton';
import './ListDetailRoute.css';
import * as api from '../../data/api';
function ListDetailRoute({ updateList, deleteList, onArchiveList }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentUser] = useState({ id: '1', name: 'Jane Doe' });
    const [shoppingList, setShoppingList] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        const fetchListDetails = async () => {
            try {
                const listDetails = await api.getList(id);
                if (listDetails.isArchived) {
                    // Redirect to overview if the list is archived
                    navigate('/overview');
                    return;
                }
                setShoppingList(listDetails);
                setIsOwner(listDetails.owner.id === currentUser.id);
                setIsMember(listDetails.members.some(member => member.id === currentUser.id) || listDetails.owner.id === currentUser.id);
            } catch (error) {
                console.error("Error fetching list details:", error);
                navigate('/overview');
            }
        };

        if (id) fetchListDetails();
    }, [id, currentUser.id, navigate]);

    const handleDeleteList = (listId) => {
        deleteList(listId);
        navigate('/overview');
    };

    const handleArchiveList = async (listId) => {
        try {
            await onArchiveList(listId);
            navigate('/overview'); // Redirect to overview after archiving
        } catch (error) {
            console.error("Error archiving list:", error);
        }
    };

    return (
        <ListDetailContent
            id={id}
            shoppingList={shoppingList}
            setShoppingList={setShoppingList}
            isOwner={isOwner}
            isMember={isMember || isOwner}
            onDeleteList={handleDeleteList}
            onArchiveList={handleArchiveList}
            navigate={navigate}
            currentUser={currentUser}
            updateList={updateList}
        />
    );
}

const ListDetailContent = ({ id, shoppingList, setShoppingList, isOwner, isMember, onDeleteList, onArchiveList, currentUser, updateList, navigate }) => {
    // Initialize state with empty array or empty string if shoppingList is null
    const [listMembers, setListMembers] = useState(shoppingList?.members || []);
    const [items, setItems] = useState(shoppingList?.items || []);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(shoppingList?.name || '');
    const [filter, setFilter] = useState('all');

    const showAll = () => setFilter('all');
    const showCompleted = () => setFilter('Completed');  // Updated to 'Completed'
    const showUncompleted = () => setFilter('Uncompleted');

    const filteredItems = items.filter(item => {
        switch (filter) {
            case 'all':
                return true;
            case 'Completed':  // Updated to 'Completed'
                return item.isCompleted;  // Check if the item is completed
            case 'Uncompleted':
                return !item.isCompleted;  // Check if the item is not completed
            default:
                return true;
        }
    });
    // Start editing the list name
    const handleEditStart = () => {
        setIsEditing(true);
        setEditName(shoppingList.name);
    };

    // Handle the change of the input field
    const handleNameChange = (event) => {
        setEditName(event.target.value);
    };

    // Save the new list name
    const handleEditSave = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        if (!editName.trim()) {
            return; // Handle empty name scenario
        }

        try {
            // API call to update the list
            const updatedList = await api.updateList(shoppingList.id, editName, shoppingList.description, currentUser.id);

            // Update the local state with the new list details
            setShoppingList({ ...updatedList });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating list:", error);
            // Optionally handle error (e.g., revert optimistic update or show error message)
        }
    };

    // Function to add an item
    const handleAddItem = async (itemName) => {
        try {
            const newItem = {
                id: `item-${Date.now()}`,
                name: itemName,
                isCompleted: false,
                quantity: 1
            };
            // Optimistically update the UI
            setItems([...items, newItem]);

            const updatedList = await api.addItemToList(shoppingList.id, itemName, 1);
            // Update the state with the response from the server
            setShoppingList(updatedList);
            setItems(updatedList.items);
        } catch (error) {
            console.error("Error adding item:", error);
            // Optionally revert the optimistic update here
        }
    };

    // Function to remove an item
    const handleRemoveItem = async (itemId) => {
        try {
            const updatedList = await api.removeItemFromList(shoppingList.id, itemId);
            
            // Update both the items and the shoppingList states
            setItems(updatedList.items);
            setShoppingList(prevList => ({ ...prevList, items: updatedList.items }));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };
    

    // Function to change the status of an item
    const handleItemStatusChange = async (itemId) => {
        try {
            const { item } = await api.markItemAsCompleted(shoppingList.id, itemId);
            setItems(prevItems => prevItems.map(i => i.id === itemId ? item : i));
        } catch (error) {
            console.error("Error changing item status:", error);
        }
    };

    // Function to add a member
    const handleAddMember = async (userId) => {
        try {
            // API call to add the member
            const updatedList = await api.inviteUserToList(shoppingList.id, userId, currentUser.id);

            // Optimistically update the state with the updated list
            setShoppingList({ ...updatedList });
            setListMembers([...updatedList.members]);
        } catch (error) {
            console.error("Error inviting user to list:", error);
            alert(error.message); 
            // Handle errors appropriately
        }
    };

    // Function to remove a member
    const handleRemoveMember = async (memberId) => {
        try {
            await api.removeUserFromList(shoppingList.id, memberId);
            // Update the local state immediately
            setShoppingList((prevShoppingList) => ({
                ...prevShoppingList,
                members: prevShoppingList.members.filter(member => member.id !== memberId)
            }));

            // Check if the current user is being removed
            if (currentUser.id === memberId) {
                // Redirect the user to /overview
                navigate('/overview');
            }
        } catch (error) {
            console.error("Error removing user from list:", error);
        }
    };

    useEffect(() => {
        const fetchListItems = async () => {
            try {
                const items = await api.viewItemsInList(id);
                setItems(items);
            } catch (error) {
                console.error("Error fetching list items:", error);
            }
        };

        if (shoppingList) {
            fetchListItems();
            setListMembers(shoppingList.members || []);
        }
    }, [shoppingList, id]);

    // Render only if shoppingList is not null
    if (!shoppingList) {
        return <div>Loading...</div>;
    }

    if (!isMember) {
        // User is not a member, you can redirect or render a message
        navigate('/overview');
    }
    return (
        <div className="list-detail">
            <div className="list-header">
                {isEditing ? (
                    <form onSubmit={handleEditSave} className="list-edit-form">
                        <input
                            type="text"
                            value={editName}
                            onChange={handleNameChange}
                            className="list-name-edit"
                            autoFocus
                        />
                        <button type="submit" className="save-edit-button">
                            Save
                        </button>
                    </form>
                ) : (
                    <>
                        <div className="list-title-with-edit">
                            <h2 className="list-title">{shoppingList.name}</h2>
                            {isOwner && !isEditing && (
                                <button onClick={handleEditStart} className="edit-list-button">
                                    Edit
                                </button>
                            )}
                        </div>
                        {isOwner && (
                            <div className="list-owner-actions">
                                <RemoveListButton onConfirmDelete={() => onDeleteList(shoppingList.id)} />
                                <button onClick={() => onArchiveList(shoppingList.id)} className="archive-list-button">
                                    Archive List
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="filter-buttons">
                <button onClick={showAll} disabled={filter === 'all'} className="filter-button">All</button>
                <button onClick={showCompleted} disabled={filter === 'Completed'} className="filter-button">Completed</button>
                <button onClick={showUncompleted} disabled={filter === 'Uncompleted'} className="filter-button">Uncompleted</button>
            </div>
            {filteredItems.map(item => (
                <ListItemsDetail
                    key={item.id}
                    item={item}
                    onItemStatusChange={isMember ? handleItemStatusChange : null}
                    onRemoveItem={isMember ? handleRemoveItem : null}
                />
            ))}
            {isMember && <AddItemButton onAdd={handleAddItem} />}
            <Owner name={shoppingList.owner.name} />
            <MembersSection
                members={listMembers}
                isOwner={isOwner}
                isMember={isMember}
                onRemoveMember={handleRemoveMember}
                onAddMember={isOwner ? handleAddMember : null} // Only owners can add members
                currentUser={currentUser}
            />
        </div>
    );
}

export default ListDetailRoute;
