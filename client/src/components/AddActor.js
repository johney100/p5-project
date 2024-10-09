import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddActor({ onAddActor, showId }) {
  const initialValues = {
    name: "",
    age: "",
    show_id: showId,
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
    // Send a POST request to create a new actor
    const actorResponse = await fetch("http://127.0.0.1:5000/actors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!actorResponse.ok) {
      console.error("Error creating actor:", actorResponse.statusText);
      return;
    }
    resetForm();

    const newActorData = await actorResponse.json();

    // Send a POST request to create a new show-actor association
    const associationResponse = await fetch("http://127.0.0.1:5000/shows_actors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        show_id: showId,
        actor_id: newActorData.id,
        role: newActorData.role,
      }),
    });

    if (!associationResponse.ok) {
      console.error(
        "Error creating show-actor association:",
        associationResponse.statusText
      );
      return;
    }

    onAddActor(newActorData);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {({ values, handleChange, touched, errors }) => ( 
        <Form className="new-review">
          <h4>Add an actor to this show</h4>
          <Field
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Enter Actor's Name"
            value={values.name}
            onChange={handleChange}
          />
          <ErrorMessage name="name" component="div" className="error" /> {/* Display name error */}

          <Field
            type="text"
            name="age"
            autoComplete="off"
            placeholder="Enter Actor's Age"
            value={values.age}
            onChange={handleChange}
          />
          <ErrorMessage name="age" component="div" className="error" /> {/* Display age error */}

          <Field
            type="text"
            name="role"
            autoComplete="off"
            placeholder="Enter Actor's Role"
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

export default AddActor;