import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MembersSection from '../../components/MembersSection/MembersSection';
import ListItemsDetail from '../../components/ListItemsDetail/ListItemsDetail';
import AddItemButton from '../../components/AddItemButton/AddItemButton';
import Owner from '../../components/Owner/Owner';
import './ListDetailRoute.css';
import { mockShoppingLists } from '../../data/mockData';

function ListDetailRoute() {
    const { id } = useParams();
    const navigate = useNavigate(); // Get the navigate function
    const [currentUser] = useState({ id: '1', name: 'Jane Doe' });
    const initialListData = mockShoppingLists.find((list) => list.id === id);
    const [lists, setLists] = useState(mockShoppingLists);

    const handleDeleteList = (listId) => {
        setLists(lists.filter(list => list.id !== listId));
        navigate('/overview'); // Use navigate to redirect
    };

    if (!initialListData) {
        return <p>List not found</p>;
    }

    // Check if the current user is the owner of the list
    const isOwner = currentUser.id === initialListData.owner.id;

    return (
        <ListDetailContent
            initialListData={initialListData}
            isOwner={isOwner}
            onDeleteList={() => handleDeleteList(id)}
            currentUser={currentUser}
        />
    );
}

function ListDetailContent({ initialListData, isOwner, onDeleteList, onArchiveList, currentUser }) {
    const [shoppingList, setShoppingList] = useState(initialListData);
    const [listMembers, setListMembers] = useState(initialListData.members);
    const [items, setItems] = useState(initialListData.items);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(initialListData.name);
    const [filter, setFilter] = useState('all'); // 'all', 'resolved', 'unresolved'

    const showAll = () => setFilter('all');
    const showResolved = () => setFilter('resolved');
    const showUnresolved = () => setFilter('unresolved');

    const filteredItems = items.filter(item => {
        if (filter === 'all') return true;
        return filter === 'resolved' ? item.resolved : !item.resolved;
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
    const handleEditSave = () => {
        setShoppingList({ ...shoppingList, name: editName });
        setIsEditing(false);
    };

    // Function to add an item
    const handleAddItem = (itemName) => {
        if (!itemName.trim()) return;
        const newItem = {
            id: Date.now().toString(), // Simplistic unique ID generation
            name: itemName,
            resolved: false,
        };
        // Update the items state
        setItems(prevItems => [...prevItems, newItem]);
    };

    // Function to remove an item
    const handleRemoveItem = (itemId) => {
        // Update the items state
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    // Function to change the status of an item
    const handleItemStatusChange = (itemId) => {
        // Update the items state
        setItems(prevItems => prevItems.map(item =>
            item.id === itemId ? { ...item, resolved: !item.resolved } : item
        ));
    };

    // Function to add a member
    const handleAddMember = (memberName) => {
        if (!memberName.trim()) return;
        const newMember = {
            id: Date.now().toString(), // Unique ID for demo purposes
            name: memberName,
        };
        // Update the listMembers state
        setListMembers(prevMembers => [...prevMembers, newMember]);
    };

    // Function to remove a member
    const handleRemoveMember = (memberId) => {
        // Update the listMembers state
        setListMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
    };

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
                                <button onClick={onDeleteList} className="delete-list-button">
                                    Delete List
                                </button>
                                <button onClick={onArchiveList} className="archive-list-button">
                                    Archive List
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div className="filter-buttons">
                <button onClick={showAll} disabled={filter === 'all'} className="filter-button">All</button>
                <button onClick={showResolved} disabled={filter === 'resolved'} className="filter-button">Resolved</button>
                <button onClick={showUnresolved} disabled={filter === 'unresolved'} className="filter-button">Unresolved</button>
            </div>
            {filteredItems.map(item => (
                <ListItemsDetail
                    key={item.id}
                    item={item}
                    onItemStatusChange={handleItemStatusChange}
                    onRemoveItem={handleRemoveItem}
                />
            ))}
            <AddItemButton onAdd={handleAddItem} />
            <Owner name={initialListData.owner.name} /> {/* Display the owner */}
            <MembersSection
                members={listMembers}
                isOwner={isOwner}
                onRemoveMember={handleRemoveMember}
                onAddMember={handleAddMember}
                currentUser={currentUser}
            />
        </div>
    );
}

export default ListDetailRoute;
