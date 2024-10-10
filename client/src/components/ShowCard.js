import React from 'react';

function ShowCard({ story, onDeleteStory, onEditStory }) {
  return (
    <div className="show-card">
      <h3>Story Title: {story.title}</h3>
      <p>{story.body}</p>
      <button onClick={() => onDeleteStory(story.id)}>Delete</button>
      {onEditStory && <button onClick={() => onEditStory(story.id)}>Edit</button>}

    </div>
  );
}

export default ShowCard;