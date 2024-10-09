import React, { useState, useEffect } from "react";

function UserCard({ user }) {
 

  return (
    <div key={user.id}>
    <h3>UserName: {user.username}</h3>
    <p>Location: {user.location}</p>
  </div>
  );
}

export default UserCard;