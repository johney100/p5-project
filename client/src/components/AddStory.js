import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyCBr3rKUNANxHMOo2yIpHrl0XqWJ_VyPss');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function AddStory({ onAddStory, storyToUpdate, onUpdateStory }) {
  const initialValues = {
    id: storyToUpdate?.id || null,
    title: storyToUpdate?.title || "",
    body: storyToUpdate?.body || "",
    useGenAI: false, // New field for GenAI option
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title && !values.useGenAI) {
      errors.title = "Title is required";
    }
    return errors;
  };

  const handleSubmit = async (values, { resetForm }) => {
    // Handle GenAI option
    if (values.useGenAI) {
      const genAIResponse = await fetchGeminiAPI(values.title); // Call Gemini API for text generation
      values.body = genAIResponse.text; // Update body with generated text
    }

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

  const fetchGeminiAPI = async (prompt) => {
  
    const response = await fetch("https://your-gemini-api-endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    return await response.json();
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

          <Field class="expanded-input"
            type="text"
            name="body"
            autoComplete="off"
            placeholder="Write a story"
            value={values.body}
            disabled={values.useGenAI} // Disable body field if GenAI is selected
            onChange={handleChange}
          />
          <ErrorMessage name="body" component="div" className="error" />

          <button className="new-story-button" type="submit">{storyToUpdate ? "Update" : "Submit"}</button>
        </Form>
      )}
    </Formik>
  );
}

export default AddStory;