import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import ListDetailRoute from './routes/ListDetailRoute/ListDetailRoute';
import OverviewRoute from './routes/OverviewRoute/OverviewRoute';
import ArchivedRoute from './routes/ArchivedRoute/ArchivedRoute';
import * as api from './data/api';
import './App.css';

import enTranslation from './locales/en/translation.json';
import csTranslation from './locales/cs/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      cs: {
        translation: csTranslation
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

function App() {
  // Mock current user
  const currentUser = { id: '1', name: 'Jane Doe' };
  const [allLists, setAllLists] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

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
      const activeLists = await api.viewShoppingLists(currentUser.id, false);
      const archivedLists = await api.viewShoppingLists(currentUser.id, true);

      if (activeLists.length === 0 && archivedLists.length === 0) {
        // Handle the case when no lists are found for the user
      } else {
        setAllLists([...activeLists, ...archivedLists]);
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  }, [currentUser.id]);

  const archiveList = async (listId) => {
    try {
      const updatedList = await api.archiveList(listId, currentUser.id);
      setAllLists(prevLists => {
        const newLists = prevLists.map(list => list.id === listId ? { ...updatedList, isArchived: true } : list);
        return newLists;
      });
    } catch (error) {
      console.error("Error archiving list:", error);
    }
  };

  // Function to handle unarchiving a list
  const unarchiveList = async (listId) => {
    try {
      const updatedList = await api.unarchiveList(listId, currentUser.id);
      setAllLists(prevLists => {
        const newLists = prevLists.map(list => list.id === listId ? { ...updatedList, isArchived: false } : list);
        return newLists;
      });
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
      setAllLists(prevLists => {
        const newLists = prevLists.filter(list => list.id !== listId);
        return newLists;
      });
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <NavbarComponent currentUser={currentUser} toggleTheme={toggleTheme} />
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
                allLists={allLists.filter(list => !list.isArchived).map(list => ({
                  ...list,
                  itemCount: list.items ? list.items.length : 0
                }))}
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
                fetchLists={fetchLists}
              />
            }
          />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;