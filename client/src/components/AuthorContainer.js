import React, { useContext, useEffect, useState } from "react";
import AuthorCard from "./AuthorCard"; 
import { DataContext } from './contexts/dataContext';

function AuthorContainer(){
  const { authors } = useContext(DataContext);
  return (
    <div>
      <h2>This is the Author Card</h2>
      <h1>List your favorite authors</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <AuthorCard author={author} /> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorContainer;