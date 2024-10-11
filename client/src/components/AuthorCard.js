import React, { useEffect, useState } from "react";
// Displaying individual show information

function AuthorCard({ author }) {
    const [story, setStory] = useState(null);

    useEffect(() => {
        const fetchStoryData = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:5000/stories/${author.story_id}`);
            const storyData = await response.json();
            setStory(storyData);
          } catch (error) {
            console.error("Error fetching story data:", error);
          }
        };
    
        fetchStoryData();
      }, [author.story_id]);

    return (
      <div className="author-card">
        <h3>{author.name}</h3>
        <p>Age: {author.age}</p>
        {story && <p>Recent stories: {story.name}</p>}
        {/* Add other story details as needed */}
      </div>
    );
  }
  


export default AuthorCard;