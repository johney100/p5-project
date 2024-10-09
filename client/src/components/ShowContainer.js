import React, { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import ReviewCard from "./ReviewCard";
import AddShow from "./AddShow";
import AddReview from "./AddReview";
import AddActor from "./AddActor";

function ShowContainer() {
  const [reviews, setReviews] = useState([]);
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null); // Track selected show for update
  console.log(selectedShow)
  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/shows');
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShowData();
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

  const handleAddShow = (newShow) => {
    console.log("New show added:", newShow);
    
  };

  const handleAddReview = (showId, newReview) => {
    console.log("New review added for show", showId, newReview);
  };

  const handleDeleteShow = (showId) => {
    fetch(`http://127.0.0.1:5000/shows/${showId}`, {
      method: "DELETE",
    })
      .then(() => {
        setShows(shows.filter((show) => show.id !== showId));
      })
      .catch((error) => {
        console.error("Error deleting show:", error);
      });
  };

  const handleEditShow = (showId) => {
    console.log(showId)
    setSelectedShow(shows.find((show) => show.id === showId));
 
  };

  const handleUpdateShow = (updatedShow) => {
    setShows((prevShows) =>
      prevShows.map((show) => (show.id === updatedShow.id ? updatedShow : show))
    );
  };

  return (
    <div className="container">
      <h2>This is the Show Card</h2>
      <h1>Add a new show</h1>
      <AddShow onAddShow={handleAddShow} showToUpdate={selectedShow} onUpdateShow={handleUpdateShow} />
      <h2>List of TV Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <ShowCard show={show} onDeleteShow={handleDeleteShow} onEditShow={handleEditShow} />
            <ReviewCard review={reviews.find((review) => review.show_id === show.id)} showId = {show.id} onAddReview={handleAddReview} />
            <AddReview onAddReview={handleAddReview} showId = {show.id}/>
            <AddActor showId={show.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowContainer;