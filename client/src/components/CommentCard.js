
// Displaying individual show information
import React, { useState } from "react";

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      {comment ? (  
        <>
          <h4>Comment: "{comment.comment}"</h4>
          <p>Rating: {comment.rating}/5</p>
        </>
      ) : (
        <p>No comment available for this show.</p>
      )}
    </div>
  );
}
  
  export default CommentCard;