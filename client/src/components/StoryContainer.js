import React, { useState, useEffect } from "react";
import StoryCard from "./StoryCard";
import CommentCard from "./CommentCard";
import AddStory from "./AddStory";
import AddComment from "./AddComment";
import AddAuthor from "./AddAuthor";
import { DataContext } from "./contexts/dataContext";



function StoryContainer() {



  const [comments, setComments] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null); // Track selected story for update
  console.log(selectedStory)
  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/stories');
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStoryData();
  }, []);

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/comments");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchCommentsData();
  }, []);

  const handleAddStory = (newStory) => {
    console.log("New story added:", newStory);
    
  };

  const handleAddComment = (storyId, newComment) => {
    console.log("New comment added for story", storyId, newComment);
  };

  const handleDeleteStory = (storyId) => {
    fetch(`http://127.0.0.1:5000/stories/${storyId}`, {
      method: "DELETE",
    })
      .then(() => {
        setStories(stories.filter((story) => story.id !== storyId));
      })
      .catch((error) => {
        console.error("Error deleting story:", error);
      });
  };

  const handleEditStory = (storyId) => {
    console.log(storyId)
    setSelectedStory(stories.find((story) => story.id === storyId));
 
  };

  const handleUpdateStory = (updatedStory) => {
    setStories((prevStories) =>
      prevStories.map((story) => (story.id === updatedStory.id ? updatedStory : story))
    );
  };

  return (
    <div class ="story-container">
        <h1>Add a new story</h1>
      <AddStory onAddStory={handleAddStory} storyToUpdate={selectedStory} onUpdateStory={handleUpdateStory} />
      <h2>Latest Stories</h2>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <StoryCard story={story} onDeleteStory={handleDeleteStory} onEditStory={handleEditStory} />
            <CommentCard comment={comments.find((comment) => comment.story_id === story.id)} storyId = {story.id} onAddComment={handleAddComment} />
            <AddComment onAddComment={handleAddComment} storyId = {story.id}/>
            <AddAuthor storyId={story.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoryContainer;