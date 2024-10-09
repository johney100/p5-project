import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddShow({ onAddShow, showToUpdate, onUpdateShow }) {
  const initialValues = {
    id: showToUpdate?.id || null,
    name: showToUpdate?.name || "",
    network: showToUpdate?.network || "",
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
    console.log(showToUpdate)
    const url = showToUpdate ? `http://127.0.0.1:5000/shows/${showToUpdate.id}` : "http://127.0.0.1:5000/shows";
    const method = showToUpdate ? "PUT" : "POST";
    const body = JSON.stringify(values);

    try {
      const response = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body });
      if (!response.ok) {
        throw new Error(`Error ${method === "PUT" ? "updating" : "creating"} show: ${response.statusText}`);
      }
      const newShowData = await response.json();
      if (showToUpdate) {
        onUpdateShow(newShowData);
      } else {
        onAddShow(newShowData);
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
        <Form className="new-show">
          <Field
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Enter show name"
            value={values.name}
            onChange={handleChange}
          />
          <ErrorMessage name="name" component="div" className="error" />

          
          <Field
            type="text"
            name="network"
            autoComplete="off"
            placeholder="Enter network"
            value={values.network}
            onChange={handleChange}
          />
          <ErrorMessage name="network" component="div" className="error" />

          <button type="submit">{showToUpdate ? "Update" : "Send"}</button>
        </Form>
      )}
    </Formik>
  );
}

export default AddShow;