import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddAuthor({ onAddAuthor, storyId }) {
  const initialValues = {
    name: "",
    age: "",
    story_id: storyId,
    role: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.age || isNaN(values.age)) {
      errors.age = "Age must be a number";
    }
    if (!values.role) {
      errors.role = "Role is required";
    }
    return errors;
  };

  const handleSubmit = async (values, { resetForm }) => {
    // Send a POST request to create a new author
    const authorResponse = await fetch("http://127.0.0.1:5000/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!authorResponse.ok) {
      console.error("Error creating author:", authorResponse.statusText);
      return;
    }
    resetForm();

    const newAuthorData = await authorResponse.json();

    // Send a POST request to create a new story-author association
    const associationResponse = await fetch("http://127.0.0.1:5000/stories_authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story_id: storyId,
        author_id: newAuthorData.id,
        role: newAuthorData.role,
      }),
    });

    if (!associationResponse.ok) {
      console.error(
        "Error creating story-author association:",
        associationResponse.statusText
      );
      return;
    }

    onAddAuthor(newAuthorData);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {({ values, handleChange, touched, errors }) => ( 
        <Form className="new-author">
          <h4>Add an author to this story</h4>
          <Field
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Enter Author's Name"
            value={values.name}
            onChange={handleChange}
          />
          <ErrorMessage name="name" component="div" className="error" /> {/* Display name error */}

          <Field
            type="text"
            name="age"
            autoComplete="off"
            placeholder="Enter author's Age"
            value={values.age}
            onChange={handleChange}
          />
          <ErrorMessage name="age" component="div" className="error" /> {/* Display age error */}

          <Field
            type="text"
            name="role"
            autoComplete="off"
            placeholder="Enter Author's Role"
            value={values.role}
            onChange={handleChange}
          />
          <ErrorMessage name="role" component="div" className="error" /> {/* Display role error */}

          <button type="submit" disabled={!!errors.length}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default AddAuthor;