// contexts/dataContext.js

import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext({
  authors: [],
  users: [],
  setAuthors: () => {},
  setUsers: () => {},
  setStories: () => {},
  setComments: () => {},
  stories: [],
  comments: [],
  handleAddStory: () => {},
  handleAddComment: () => {},
  handleDeleteStory: () => {},
  handleEditStory: () => {},
  handleUpdateStory: () => {},
});


const DataProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);
  const [comments, setComments] = useState([]);
  
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


    const fetchCommentsData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:5000/comments");
          const data = await response.json();
          setComments(data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/authors');
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAuthorData();
    fetchUserData();
  }, []);

  return (
    <DataContext.Provider value={{ authors, users, setAuthors, setUsers, stories, setStories, comments, setComments, handleAddStory, handleAddComment, handleDeleteStory, handleEditStory, handleUpdateStory }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

/*

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

  */