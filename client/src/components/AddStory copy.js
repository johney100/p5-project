import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddStory({ onAddStory, storyToUpdate, onUpdateStory }) {
  const initialValues = {
    id: storyToUpdate?.id || null,
    title: storyToUpdate?.title || "",
    body: storyToUpdate?.body || "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    return errors;
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values)
    console.log(storyToUpdate)
    const url = storyToUpdate ? `http://127.0.0.1:5000/stories/${storyToUpdate.id}` : "http://127.0.0.1:5000/stories";
    const method = storyToUpdate ? "PUT" : "POST";
    const body = JSON.stringify(values);

    try {
      const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body });
      if (!response.ok) {
        throw new Error(`Error ${method === "PUT" ? "updating" : "creating"} story: ${response.statusText}`);
      }
      const newStoryData = await response.json();
      if (storyToUpdate) {
        onUpdateStory(newStoryData);
      } else {
        onAddStory(newStoryData);
      }
      // Reset form after successful submit
    } catch (error) {
      console.error(error.message);
    }
    resetForm();
  };


  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validate}>
      {({ values, handleChange, touched, errors }) => (
        <Form className="new-story">
          <Field
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Add story title"
            value={values.title}
            onChange={handleChange}
          />
          <ErrorMessage name="title" component="div" className="error" />

          
          <Field
            type="text"
            name="body"
            autoComplete="off"
            placeholder="Write a story"
            value={values.body}
            onChange={handleChange}
          />
          <ErrorMessage name="body" component="div" className="error" />

          <button type="submit">{storyToUpdate ? "Update" : "Send"}</button>
        </Form>
      )}
    </Formik>
  );
}

export default AddStory;