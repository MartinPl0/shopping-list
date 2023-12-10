import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import ListDetailRoute from './routes/ListDetailRoute/ListDetailRoute';
import OverviewRoute from './routes/OverviewRoute/OverviewRoute';
import ArchivedRoute from './routes/ArchivedRoute/ArchivedRoute';
import * as api from './data/api';
import './App.css';

function App() {
  // Mock current user
  const currentUser = { id: '1', name: 'Jane Doe' };
  const [allLists, setAllLists] = useState([]);

  const createNewList = async (listName, description) => {
    try {
      const newList = await api.createList(listName, description, currentUser.id);
      setAllLists(prevLists => [...prevLists, newList]);
    } catch (error) {
      console.error("Error creating new list:", error);
    }
  };

  const fetchLists = useCallback(async () => {
    try {
      // Fetch non-archived lists
      const activeLists = await api.viewShoppingLists(currentUser.id, false);
      // Fetch archived lists
      const archivedLists = await api.viewShoppingLists(currentUser.id, true);
      // Combine the results
      const combinedLists = [...activeLists, ...archivedLists];
      setAllLists(combinedLists);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  }, [currentUser.id]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists])
  // Function to handle archiving a list
  const archiveList = async (listId) => {
    try {
      const updatedList = await api.archiveList(listId, currentUser.id);
      setAllLists(allLists.map(list => list.id === updatedList.id ? updatedList : list));
    } catch (error) {
      console.error("Error archiving list:", error);
    }
  };

  // Function to handle unarchiving a list
  const unarchiveList = async (listId) => {
    try {
      const updatedList = await api.unarchiveList(listId, currentUser.id);
      setAllLists(allLists.map(list => list.id === updatedList.id ? updatedList : list));
    } catch (error) {
      console.error("Error unarchiving list:", error);
    }
  };

  const updateList = (updatedList) => {
    setAllLists(prevLists => prevLists.map(list =>
      list.id === updatedList.id ? updatedList : list
    ));
  };

  const deleteList = async (listId) => {
    try {
      await api.deleteList(listId);
      fetchLists();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  return (
    <Router>
      <NavbarComponent currentUser={currentUser} />
      <Routes>
        <Route
          path="/shopping-list/:id"
          element={
            <ListDetailRoute
              allLists={allLists}
              onArchiveList={archiveList}
              updateList={updateList}
              deleteList={deleteList}
            />
          }
        />
        <Route
          path="/overview"
          element={
            <OverviewRoute
              allLists={allLists.filter(list => !list.isArchived)}
              fetchLists={fetchLists}
              createNewList={createNewList}
              currentUser={currentUser}
            />
          }
        />
        <Route path="/" element={<Navigate replace to="/overview" />} />
        <Route
          path="/archived"
          element={
            <ArchivedRoute
              archivedLists={allLists.filter(list => list.isArchived)}
              unarchiveList={unarchiveList}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;