import React from 'react';

function ShowCard({ show, onDeleteShow, onEditShow }) {
  return (
    <div className="show-card">
      <h3>Show Name: {show.name}</h3>
      <p>Network: {show.network}</p>
      <button onClick={() => onDeleteShow(show.id)}>Delete</button>
      {onEditShow && <button onClick={() => onEditShow(show.id)}>Edit</button>}

    </div>
  );
}

export default ShowCard;