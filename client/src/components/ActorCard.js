import React, { useEffect, useState } from "react";
// Displaying individual show information

function ActorCard({ actor }) {
    const [show, setShow] = useState(null);

    useEffect(() => {
        const fetchShowData = async () => {
          try {
            const response = await fetch(`http://127.0.0.1:5000/shows/${actor.show_id}`);
            const showData = await response.json();
            setShow(showData);
          } catch (error) {
            console.error("Error fetching show data:", error);
          }
        };
    
        fetchShowData();
      }, [actor.show_id]);

    return (
      <div className="actor-card">
        <h3>{actor.name}</h3>
        <p>Age: {actor.age}</p>
        {show && <p>Recent shows: {show.name}</p>}
        {/* Add other show details as needed */}
      </div>
    );
  }
  


export default ActorCard;