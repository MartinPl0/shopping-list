import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import ListDetailRoute from './routes/ListDetailRoute/ListDetailRoute';
import OverviewRoute from './routes/OverviewRoute/OverviewRoute';
import ArchivedRoute from './routes/ArchivedRoute/ArchivedRoute';
import { mockShoppingLists, mockArchivedLists } from './data/mockData';
import './App.css';

function App() {
  // Mock current user
  const currentUser = { id: '1', name: 'Jane Doe' };
  const [shoppingLists, setShoppingLists] = useState(mockShoppingLists);
  const [archivedLists, setArchivedLists] = useState(mockArchivedLists);

  // Function to handle archiving a list
  const archiveList = (listId) => {
    const listToArchive = shoppingLists.find(list => list.id === listId);
    if (listToArchive) {
        // Create a copy of the list to archive
        const archivedList = { ...listToArchive };
        
        // Remove the list from shoppingLists
        setShoppingLists(currentLists => currentLists.filter(list => list.id !== listId));
        
        // Add the archived list to archivedLists
        setArchivedLists(currentArchivedLists => [...currentArchivedLists, archivedList]);
    }
};

  // Function to handle unarchiving a list
  const unarchiveList = (listId) => {
    setArchivedLists(currentArchivedLists =>
        currentArchivedLists.filter(list => list.id !== listId)
    );
    const listToUnarchive = archivedLists.find(list => list.id === listId);
    if (listToUnarchive) {
        // Create a copy of the list to unarchive
        const unarchivedList = { ...listToUnarchive };
        
        // Remove the list from archivedLists
        setArchivedLists(currentArchivedLists =>
            currentArchivedLists.filter(list => list.id !== listId)
        );
        
        // Add the unarchived list back to shoppingLists
        setShoppingLists(currentLists => [...currentLists, unarchivedList]);
    }
};

  const updateList = (updatedList) => {
    setShoppingLists(prevLists => prevLists.map(list => 
        list.id === updatedList.id ? updatedList : list
    ));
  };

  const deleteList = (listId) => {
    setShoppingLists(currentLists => currentLists.filter(list => list.id !== listId));
  };

  return (
    <Router>
      <NavbarComponent currentUser={currentUser} />
      <Routes>
        <Route
          path="/shopping-list/:id"
          element={
            <ListDetailRoute
              shoppingLists={shoppingLists}
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
              shoppingLists={shoppingLists}
              setShoppingLists={setShoppingLists}
              archivedLists={archivedLists}
              currentUser={currentUser}
            />
          }
        />
        <Route path="/" element={<Navigate replace to="/overview" />} />
        <Route
          path="/archived"
          element={
            <ArchivedRoute
              archivedLists={archivedLists}
              unarchiveList={unarchiveList}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;