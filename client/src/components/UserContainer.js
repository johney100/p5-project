import React, { useContext, useEffect, useState } from "react";
import UserCard from "./UserCard"; 
import AddUser from "./AddUser";
import { DataContext } from './contexts/dataContext';

function UserContainer(/*{users}*/) {
  const { users } = useContext(DataContext);
  return (
    <div>
      <h2>Active User List</h2>
      <h3>Add a new user</h3>
      <AddUser  />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
           
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default UserContainer;