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
    setShoppingLists(currentLists => currentLists.filter(list => list.id !== listId));
    setArchivedLists(currentArchivedLists => [
      ...currentArchivedLists,
      shoppingLists.find(list => list.id === listId),
    ]);
  };

  // Function to handle unarchiving a list
  const unarchiveList = (listId) => {
    setArchivedLists(currentArchivedLists =>
      currentArchivedLists.filter(list => list.id !== listId)
    );
    const listToUnarchive = archivedLists.find(list => list.id === listId);
    if (listToUnarchive) {
      setShoppingLists(currentLists => [...currentLists, listToUnarchive]);
    }
  };

  return (
    <Router>
      <NavbarComponent currentUser={currentUser} />
      <Routes>
        <Route path="/shopping-list/:id" element={<ListDetailRoute archiveList={archiveList} />} />
        <Route path="/overview" element={<OverviewRoute shoppingLists={shoppingLists} setShoppingLists={setShoppingLists} archiveList={archiveList} />} />
        <Route path="/" element={<Navigate replace to="/overview" />} />
        <Route path="/archived" element={<ArchivedRoute archivedLists={archivedLists} unarchiveList={unarchiveList} />} />
      </Routes>
    </Router>
  );
}

export default App;