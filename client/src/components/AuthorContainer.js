import React, {useEffect, useState } from "react";
import AuthorCard from "./AuthorCard"; 

function AuthorContainer({authors}) {
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