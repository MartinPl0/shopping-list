// src/data/api.js
import { mockShoppingLists, users } from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let lastUsedId = Math.max(
    0, // Default value
    ...mockShoppingLists.map(list => parseInt(list.id) || 0),
);

const getNextId = () => {
    lastUsedId++;
    return lastUsedId.toString();
};

const createErrorResponse = (status, message) => {
    return Promise.reject({ status, message });
};

// Logic to get a specific shopping list
export const getList = async (listId) => {
    await delay(500);
    const list = [...mockShoppingLists].find(list => list.id === listId);
    if (!list) {
        return createErrorResponse(404, 'List not found');
    }
    return Promise.resolve(list);
};

// Logic to create a new shopping list
export const createList = async (name, description, ownerId) => {
    await delay(500);
    if (!users.some(user => user.id === ownerId)) {
        return createErrorResponse(404, 'User not found');
    }
    const newListId = getNextId();
    const newList = {
        id: newListId,
        name,
        description,
        items: [],
        members: [],
        owner: users.find(user => user.id === ownerId)
    };
    mockShoppingLists.push(newList);
    return Promise.resolve(newList);
};

// Logic to update a shopping list
export const updateList = async (listId, name, description, userId) => {
    await delay(500);
    const list = mockShoppingLists.find(list => list.id === listId);
    if (!list) {
        return createErrorResponse(404, 'List not found');
    }
    if (list.owner.id !== userId) {
        return createErrorResponse(401, 'Not authorized to update this list');
    }
    if (list.isArchived) {
        return createErrorResponse(400, 'Cannot modify an archived list');
    }
    list.name = name;
    list.description = description;
    return Promise.resolve(list);
};

// Logic to delete a shopping list
export const deleteList = async (listId) => {
    await delay(500);
    const listIndex = mockShoppingLists.findIndex(list => list.id === listId);
    if (listIndex > -1) {
        mockShoppingLists.splice(listIndex, 1);
        users.forEach(user => {
            user.ownedLists = user.ownedLists.filter(id => id !== listId);
            user.memberOfLists = user.memberOfLists.filter(id => id !== listId);
        });
        return Promise.resolve('List deleted successfully');
    } else {
        return createErrorResponse(404, 'List not found');
    }
};

// Logic to archive a shopping list
export const archiveList = async (listId, userId) => {
    await delay(500);
    const list = mockShoppingLists.find(list => list.id === listId && list.owner.id === userId);
    if (!list) {
        return createErrorResponse(404, 'List not found or unauthorized');
    }
    list.isArchived = true;
    return Promise.resolve(list);
};

// Logic to unarchive a shopping list
export const unarchiveList = async (listId, userId) => {
    await delay(500);
    const list = mockShoppingLists.find(list => list.id === listId && list.owner.id === userId);
    if (!list || !list.isArchived) {
        return createErrorResponse(404, 'List not found or unauthorized');
    }
    list.isArchived = false;
    return Promise.resolve(list);
};

// Logic to invite a user to a shopping list
export const inviteUserToList = async (listId, invitedUserName, invitingUserId) => {
    await delay(500);
    const list = mockShoppingLists.find((list) => list.id === listId);
    const invitedUser = users.find((user) => user.name === invitedUserName);

    if (!list) {
        return createErrorResponse(404, 'List not found');
    }
    if (!invitedUser) {
        return createErrorResponse(404, 'Invited user not found');
    }
    if (list.members.some((member) => member.id === invitedUser.id)) {
        return createErrorResponse(400, 'User already a member');
    }
    if (list.owner.id !== invitingUserId) {
        return createErrorResponse(401, 'Unauthorized');
    }

    list.members.push(invitedUser);
    return Promise.resolve(list);
};

// Logic to add an item to a shopping list
export const addItemToList = async (listId, itemName, quantity) => {
    await delay(500);
    const list = mockShoppingLists.find(list => list.id === listId);
    if (!list) {
        return createErrorResponse(404, 'List not found');
    }
    if (list.isArchived) {
        return createErrorResponse(400, 'List is archived');
    }
    const existingItem = list.items.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const newItem = {
            id: `item-${Date.now()}`,
            name: itemName,
            isCompleted: false,
            quantity
        };
        list.items.push(newItem);
    }
    return Promise.resolve(list);
};

// Logic to remove an item from a shopping list
export const removeItemFromList = async (listId, itemId) => {
    await delay(500);
    const list = mockShoppingLists.find(list => list.id === listId);
    if (!list) {
        return createErrorResponse(404, 'List not found');
    }
    if (list.isArchived) {
        return createErrorResponse(400, 'List is archived');
    }
    const itemIndex = list.items.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        list.items.splice(itemIndex, 1);
        return Promise.resolve(list);
    } else {
        return createErrorResponse(404, 'Item not found');
    }
};

// Logic to mark an item as completed in a shopping list
export const markItemAsCompleted = async (listId, itemId) => {
    await delay(500);
    const list = mockShoppingLists.find(list => list.id === listId);
    if (!list) {
        return createErrorResponse(404, 'List not found');
    }
    if (list.isArchived) {
        return createErrorResponse(400, 'Cannot modify an archived list');
    }
    const item = list.items.find(item => item.id === itemId);
    if (item) {
        item.isCompleted = !item.isCompleted;
        return Promise.resolve({ status: "success", item });
    } else {
        return createErrorResponse(404, 'Item not found');
    }
};

export const viewShoppingLists = async (userId, showArchived = false) => {
    await delay(500);
    const userLists = mockShoppingLists.filter(list =>
        (list.owner.id === userId || list.members.some(member => member.id === userId)) &&
        (showArchived ? list.isArchived : !list.isArchived)
    );
    return userLists.length > 0 ? Promise.resolve(userLists) : Promise.reject('No lists found for this user');
};


// Logic to remove a user from a shopping list
export const removeUserFromList = async (listId, userId) => {
    await delay(500);
    const list = mockShoppingLists.find(list => list.id === listId);
    if (!list) {
        return createErrorResponse(404, 'List not found');
    }
    list.members = list.members.filter(member => member.id !== userId);
    return Promise.resolve(list);
};


// Logic to view items in a shopping list
export const viewItemsInList = async (listId) => {
    await delay(500);
    const list = mockShoppingLists.find(list => list.id === listId);
    if (!list) {
        return createErrorResponse(404, 'List not found');
    }
    return Promise.resolve(list.items);
};