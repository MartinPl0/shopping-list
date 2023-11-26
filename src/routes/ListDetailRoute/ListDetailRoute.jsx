import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MembersSection from '../../components/MembersSection/MembersSection';
import ListItemsDetail from '../../components/ListItemsDetail/ListItemsDetail';
import AddItemButton from '../../components/AddItemButton/AddItemButton';
import Owner from '../../components/Owner/Owner';
import RemoveListButton from '../../components/RemoveListButton/RemoveListButton';
import './ListDetailRoute.css';
import { mockShoppingLists } from '../../data/mockData';

function ListDetailRoute({ shoppingLists, updateList, deleteList, onArchiveList }) {
    const { id } = useParams();
    const navigate = useNavigate(); // Get the navigate function
    const [currentUser] = useState({ id: '1', name: 'Jane Doe' });
    const initialListData = shoppingLists.find((list) => list.id === id);
    const [lists, setLists] = useState(mockShoppingLists);
    const [isOwner, setIsOwner] = useState(false);
    const [isMember, setIsMember] = useState(false);

    const handleDeleteList = (listId) => {
        deleteList(listId);
        navigate('/overview');
    };

    const handleArchiveList = (listId) => {
        onArchiveList(listId);
        navigate('/overview');
    };

    useEffect(() => {
        if (!initialListData) {
            return;
        }

        // Check if the current user is the owner of the list
        const ownerCheck = currentUser.id === initialListData.owner.id;

        // Check if the current user is a member of the list
        const memberCheck = initialListData.members.some((member) => member.id === currentUser.id);

        // Set the isOwner and isMember variables
        setIsOwner(ownerCheck);
        setIsMember(ownerCheck || memberCheck);

        if (!memberCheck && !ownerCheck) {
            // Redirect back to the overview or show a message
            navigate('/overview');
        }
    }, [initialListData, currentUser, navigate]);

    return (
        <ListDetailContent
            initialListData={initialListData}
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

const ListDetailContent = ({ initialListData, isOwner, isMember, onDeleteList, onArchiveList, currentUser, updateList, navigate }) => {
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
        const updatedList = { ...shoppingList, name: editName };
        setShoppingList(updatedList);
        updateList(updatedList); // Update the list in the App state
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
    if (memberId === currentUser.id) {
        // If the current user is leaving the list, update the initialListData
        const updatedMembers = initialListData.members.filter(member => member.id !== memberId);
        const updatedListData = { ...initialListData, members: updatedMembers };

        // Update the list in the App state
        updateList(updatedListData);

        // Redirect the user to the overview page
        navigate('/overview');
    } else {
        // If it's not the current user (i.e., the owner is removing another member), update the local state
        setListMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));

        // Update the list data in the parent component or App state if necessary
        const updatedListData = { ...initialListData, members: listMembers.filter(member => member.id !== memberId) };
        updateList(updatedListData);
    }
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
                                <RemoveListButton onConfirmDelete={() => onDeleteList(initialListData.id)} />
                                <button onClick={() => onArchiveList(initialListData.id)} className="archive-list-button">
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
                    onItemStatusChange={isMember ? handleItemStatusChange : null}
                    onRemoveItem={isMember ? handleRemoveItem : null}
                />
            ))}
            {isMember && <AddItemButton onAdd={handleAddItem} />}
            <Owner name={initialListData.owner.name} />
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
