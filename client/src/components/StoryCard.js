import React from 'react';

function StoryCard({ story, onDeleteStory, onEditStory }) {
  return (
    <div class="story-content" >
      <h3 class="story-title">Story Title: {story.title}</h3>
      <p class="story-content">{story.body}</p>
      <button onClick={() => onDeleteStory(story.id)}>Delete</button>
      {onEditStory && <button onClick={() => onEditStory(story.id)}>Edit</button>}

    </div>
  );
}

export default StoryCard;