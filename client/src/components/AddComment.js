import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddComment({ onAddComment, storyId }) {
  const initialValues = {
    comment: "",
    rating: "",
    user_id: "",
    story_id: storyId,
  };

  

  const validate = (values) => {
    const errors = {};
    if (!values.comment) {
      errors.comment = "Comment is required";
    }
    if (!values.rating || isNaN(values.rating))  {
      errors.rating = "Rating must be a number";
    } else if (values.rating < 0 || values.rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    }
    return errors;
  };

  const handleFetchUsers = (userList) => { fetch(`http://127.0.0.1:5000/users`, { method: "GET", })}

  const handleSubmit = async (values, { resetForm }) => {
    // Send a POST request to create a new comment
    const reviewResponse = await fetch("http://127.0.0.1:5000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!reviewResponse.ok) {
      console.error("Error creating comment:", reviewResponse.statusText);
      return;
    }
    resetForm();

    const newCommentData = await reviewResponse.json();
    onAddComment(newCommentData);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {({ values, handleChange, touched, errors }) => (
        <Form className="new-comment">
          <h3>Comment on this story</h3>
          <Field
            type="text"
            name="comment"
            autoComplete="off"
            placeholder="Add your comment"
            value={values.comment}
            onChange={handleChange}
          />
          <ErrorMessage name="comment" component="div" className="error" />

          <Field
            type="number" // Change input type to number for rating
            name="rating"
            autoComplete="off"
            placeholder="Add a rating out of 5"
            value={values.rating}
            onChange={handleChange}
          />
          <ErrorMessage name="rating" component="div" className="error" />
          
          <Field
            type="text"
            name="username"
            autoComplete="off"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          />
          <ErrorMessage name="username" component="div" className="error" />

          <button type="submit" disabled={!!errors.length}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AddComment;