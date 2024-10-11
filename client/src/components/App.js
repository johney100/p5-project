import React, { useEffect, useState } from "react";
import '../index.css';
import StoryContainer from './StoryContainer';
import AuthorContainer from './AuthorContainer';
import UserContainer from './UserContainer';
import NavBar from './NavBar';
import AiCard from "./AiCard";
import {BrowserRouter, Switch, Routes, Route, Link} from "react-router-dom";





function App() {

  
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

    fetchAuthorData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserData();
  }, []);

 

  return (
    <div className="App"> 
    <h1>Story App</h1>
    <BrowserRouter>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<StoryContainer />} />
        <Route path="/authors" element={<AuthorContainer authors={authors}  />} />
        <Route path="/users" element={<UserContainer users={users} />} />
        <Route path="/AI" element={<AiCard />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
