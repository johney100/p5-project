import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddUser({ onAddUser }) {
  const initialValues = {
    location: "",
    username: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.location) {
      errors.location = "Location is required";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    return errors;
  };

  const handleSubmit = async (values) => {
    const response = await fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      console.error("Error creating user:", response.statusText);
      return;
    }

    const newUser = await response.json();
    onAddUser(newUser);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {({ values, handleChange, touched, errors }) => (
        <Form className="new-review">
          <Field
            type="text"
            name="location"
            autoComplete="off"
            placeholder="Enter Location"
            value={values.location}
            onChange={handleChange}
          />
          <ErrorMessage name="location" component="div" className="error" />

          <Field
            type="text"
            name="username"
            autoComplete="off"
            placeholder="Enter Username"
            value={values.username}
            onChange={handleChange}
          />
          <ErrorMessage name="username" component="div" className="error" />

          <button type="submit" disabled={!!errors.length}>Send</button>
        </Form>
      )}
    </Formik>
  );
}

export default AddUser;