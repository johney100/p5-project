import React, {useEffect, useState } from "react";
import ActorCard from "./ActorCard"; 

function ActorContainer({actors}) {
  return (
    <div>
      <h2>This is the Actor Card</h2>
      <h1>List your favorite actors</h1>
      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>
            <ActorCard actor={actor} /> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActorContainer;