import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddReview({ onAddReview, showId }) {
  const initialValues = {
    comment: "",
    score: "",
    show_id: showId,
  };

  const validate = (values) => {
    const errors = {};
    if (!values.comment) {
      errors.comment = "Comment is required";
    }
    if (!values.score || isNaN(values.score)) {
      errors.score = "Score must be a number";
    } else if (values.score < 0 || values.score > 10) {
      errors.score = "Score must be between 0 and 10";
    }
    return errors;
  };

  const handleSubmit = async (values, { resetForm }) => {
    // Send a POST request to create a new review
    const reviewResponse = await fetch("http://127.0.0.1:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!reviewResponse.ok) {
      console.error("Error creating review:", reviewResponse.statusText);
      return;
    }
    resetForm();

    const newReviewData = await reviewResponse.json();
    onAddReview(newReviewData);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {({ values, handleChange, touched, errors }) => (
        <Form className="new-review">
          <h3>Leave a review</h3>
          <Field
            type="text"
            name="comment"
            autoComplete="off"
            placeholder="Add your review"
            value={values.comment}
            onChange={handleChange}
          />
          <ErrorMessage name="comment" component="div" className="error" />

          <Field
            type="number" // Change input type to number for score
            name="score"
            autoComplete="off"
            placeholder="Add a score out of 10"
            value={values.score}
            onChange={handleChange}
          />
          <ErrorMessage name="score" component="div" className="error" />

          <button type="submit" disabled={!!errors.length}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AddReview;