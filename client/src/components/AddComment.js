import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddComment({ onAddComment, storyId }) {
  const [userList, setUserList] = useState([])

  const initialValues = {
    comment: "",
    rating: "",
    user_id: "",
    story_id: storyId,
    username: ""
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

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://127.0.0.1:5000/users");
      if (response.ok) {
        const data = await response.json();
        setUserList(data);
      } else {
        console.error("Error fetching user list:", response.statusText);
      }
    };
    fetchUsers();
  }, []);
  
  console.log(userList)
    

  const handleSubmit = async (values, { resetForm }) => {
    // Send a POST request to create a new comment
    //const handleFetchUsers = (userList) => { fetch(`http://127.0.0.1:5000/users`, { method: "GET", })}
    //const userId = userList.find((user) => user.username === values.username)?.user_id;

    const userId = userList.find((user) => user.username === values.username)?.id;
    console.log(userId)
    if (!userId) {
      console.error("User ID not found for username:", values.username);
      return;
    }

   
    // Update values with retrieved user ID
    values.user_id = userId;

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

          <button class="new-comment-button" type="submit" disabled={!!errors.length}>
            Post
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AddComment;