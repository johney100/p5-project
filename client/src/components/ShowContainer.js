import React, { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import ReviewCard from "./ReviewCard";
import AddShow from "./AddShow";
import AddReview from "./AddReview";
import AddActor from "./AddActor";

function ShowContainer() {
  const [reviews, setReviews] = useState([]);
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null); // Track selected show for update
  console.log(selectedStory)
  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/stories');
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchStoryData();
  }, []);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviewsData();
  }, []);

  const handleAddStory = (newStory) => {
    console.log("New story added:", newStory);
    
  };

  const handleAddReview = (storyId, newReview) => {
    console.log("New review added for story", storyId, newReview);
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
    <div className="container">
      <h2>This is the Story Card</h2>
      <h1>Add a new story</h1>
      <AddShow onAddStory={handleAddStory} storyToUpdate={selectedStory} onUpdateStory={handleUpdateStory} />
      <h2>List of Stories</h2>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <ShowCard story={story} onDeleteStory={handleDeleteStory} onEditStory={handleEditStory} />
            <ReviewCard review={reviews.find((review) => review.story_id === story.id)} storyId = {story.id} onAddReview={handleAddReview} />
            <AddReview onAddReview={handleAddReview} storyId = {story.id}/>
            <AddActor storyId={story.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowContainer;