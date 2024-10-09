
// Displaying individual show information
import React, { useState } from "react";

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      {review ? (  
        <>
          <h4>Review: "{review.comment}"</h4>
          <p>Score: {review.score}/4</p>
        </>
      ) : (
        <p>No review available for this show.</p>
      )}
    </div>
  );
}
  
  export default ReviewCard;