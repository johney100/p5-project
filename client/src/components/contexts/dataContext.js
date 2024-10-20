// contexts/dataContext.js

import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext({
  authors: [],
  users: [],
  setAuthors: () => {},
  setUsers: () => {},
});

const DataProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/authors');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAuthorData();
    fetchUserData();
  }, []);

  return (
    <DataContext.Provider value={{ authors, users, setAuthors, setUsers }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };