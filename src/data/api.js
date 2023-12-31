import { mockShoppingLists, users } from './mockData';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const API_URL = process.env.REACT_APP_API_URL;

const useMockData = true; // Toggle this to switch between mock data and real API

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
    if (useMockData) {
        await delay(500);
        const list = [...mockShoppingLists].find(list => list.id === listId);
        if (!list) {
            return createErrorResponse(404, 'List not found');
        }
        return Promise.resolve(list);
    } else {
        try {
            const response = await axios.get(`${API_URL}/api/${listId}`);
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                // The request was made but no response was received
                return createErrorResponse(500, 'No response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};

// Logic to create a new shopping list
export const createList = async (name, description, ownerId) => {
    if (useMockData) {
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
    } else {
        try {
            const response = await axios.post(`${API_URL}/api/createShoppingList`, {
                name,
                description,
                ownerId
            });
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                // The request was made but no response was received
                return createErrorResponse(500, 'No response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};

// Logic to update a shopping list
export const updateList = async (listId, name, description, userId) => {
    if (useMockData) {
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
    } else {
        try {
            const response = await axios.put(`${API_URL}/api/${listId}/updateShoppingList`, {
                name,
                description
            }, {
                headers: {'user-id': userId} 
            });
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};

// Logic to delete a shopping list
export const deleteList = async (listId) => {
    if (useMockData) {
        await delay(500);
        const listIndex = mockShoppingLists.findIndex(list => list.id === listId);
        if (listIndex > -1) {
            mockShoppingLists.splice(listIndex, 1);
            users.forEach(user => {
                // Check if ownedLists and memberOfLists are defined before trying to filter them
                if (Array.isArray(user.ownedLists)) {
                    user.ownedLists = user.ownedLists.filter(id => id !== listId);
                }
                if (Array.isArray(user.memberOfLists)) {
                    user.memberOfLists = user.memberOfLists.filter(id => id !== listId);
                }
            });
            return Promise.resolve('List deleted successfully');
        } else {
            return createErrorResponse(404, 'List not found');
        }
    } else {
        try {
            const response = await axios.delete(`${API_URL}/api/${listId}/deleteShoppingList`);
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};

// Unified Logic to toggle archive status of a shopping list
const toggleArchiveList = async (listId, userId) => {
    if (useMockData) {
        await delay(500);
        const list = mockShoppingLists.find(list => list.id === listId && list.owner.id === userId);
        if (!list) {
            return createErrorResponse(404, 'List not found or unauthorized');
        }
        list.isArchived = !list.isArchived; // Toggle the archive status
  // Log the updated list to verify the change
        return Promise.resolve(list);
    } else {
        try {
            const response = await axios.put(`${API_URL}/api/${listId}/archive`, null, {
                headers: {'user-id': userId}
            });
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};

// Exported function to archive a shopping list
export const archiveList = async (listId, userId) => {
    return toggleArchiveList(listId, userId);
};

// Exported function to unarchive a shopping list
export const unarchiveList = async (listId, userId) => {
    return toggleArchiveList(listId, userId);
};

// Logic to invite a user to a shopping list
export const inviteUserToList = async (listId, invitedUserId, invitingUserId) => {
    if (useMockData) {
        await delay(500);
        const list = mockShoppingLists.find((list) => list.id === listId);
        const invitedUser = users.find((user) => user.id === invitedUserId);

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
    } else {
        try {
            const response = await axios.post(`${API_URL}/api/${listId}/inviteUser`, {
                userId: invitedUserId
            }, {
                headers: {'user-id': invitingUserId}
            });
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};

// Logic to add an item to a shopping list
export const addItemToList = async (listId, itemName, quantity) => {
    if (useMockData) {
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
    } else {
        try {
            const response = await axios.post(`${API_URL}/api/${listId}/addItem`, {
                itemName,
                quantity
            });
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};

// Logic to remove an item from a shopping list
export const removeItemFromList = async (listId, itemId) => {
    if (useMockData) {
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
    } else {
        try {
            const response = await axios.delete(`${API_URL}/api/${listId}/removeItem/${itemId}`);
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};

// Logic to mark an item as completed in a shopping list
export const markItemAsCompleted = async (listId, itemId) => {
    if (useMockData) {
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
    } else {
        try {
            const response = await axios.put(`${API_URL}/api/${listId}/markItemCompleted/${itemId}`);
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};

// Logic to view all shopping lists for a user
export const viewShoppingLists = async (userId, showArchived = false) => {
    if (useMockData) {
        await delay(500);

        const userLists = mockShoppingLists.filter(list => {
            const isUserRelated = list.owner.id === userId || list.members.some(member => member.id === userId);
            const isArchivedStatusMatch = showArchived ? list.isArchived : !list.isArchived;
            return isUserRelated && isArchivedStatusMatch;
        });

        // Always resolve the promise with the found lists, even if the array is empty
        return Promise.resolve(userLists);
    } else {
        try {
            const response = await axios.get(`${API_URL}/api/viewShoppingLists`, {
                headers: {'user-id': userId},
                params: { showArchived }
            });
            return response.data.lists; // Return the lists array from the response
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};


// Logic to remove a user from a shopping list
export const removeUserFromList = async (listId, userIdToRemove) => {
    if (useMockData) {
        await delay(500);
        const list = mockShoppingLists.find(list => list.id === listId);
        if (!list) {
            return createErrorResponse(404, 'List not found');
        }
        // Filter out the user from the members array
        list.members = list.members.filter(member => member.id !== userIdToRemove);
        return Promise.resolve(list);
    } else {
        try {
            const response = await axios.delete(`${API_URL}/api/${listId}/removeUser/${userIdToRemove}`);
            return response.data;
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};


// Logic to view items in a shopping list
export const viewItemsInList = async (listId) => {
    if (useMockData) {
        await delay(500);
        const list = mockShoppingLists.find(list => list.id === listId);
        if (!list) {
            return createErrorResponse(404, 'List not found');
        }
        return Promise.resolve(list.items);
    } else {
        try {
            const response = await axios.get(`${API_URL}/api/${listId}/viewItems`);
            return response.data.items; 
        } catch (error) {
            // Handle errors from actual API call here
            if (error.response) {
                return createErrorResponse(error.response.status, error.response.data.error);
            } else if (error.request) {
                return createErrorResponse(500, 'No response from server');
            } else {
                return createErrorResponse(500, 'Error setting up request');
            }
        }
    }
};