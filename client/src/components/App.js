import React, { useEffect, useState } from "react";
import '../index.css';
import ShowContainer from './ShowContainer';
import ActorContainer from './ActorContainer';
import UserContainer from './UserContainer';
import NavBar from './NavBar';
import {BrowserRouter, Switch, Routes, Route, Link} from "react-router-dom";





function App() {

  
  const [actors, setActors] = useState([]);
  const [users, setUsers] = useState([]);
 


  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/actors');
        const data = await response.json();
        setActors(data);
      } catch (error) {
        console.error('Error fetching actors:', error);
      }
    };

    fetchActorData();
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
    <h1>TV Show App</h1>
    <BrowserRouter>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<ShowContainer />} />
        <Route path="/actors" element={<ActorContainer actors={actors}  />} />
        <Route path="/users" element={<UserContainer users={users} />} />
 
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
