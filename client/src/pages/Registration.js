import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Registration = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(14).required("Must be 3-15 characters"),
    password: Yup.string().min(4).max(14).required("must be 4-14 characters"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/api/auth", data).then((response) => {
      console.log(data);
    });
  };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <label>Login</label>
          <ErrorMessage name="username" component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="(Ex. John123...)" />
          <label htmlFor="">Login</label>
          <ErrorMessage name="password" component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="password" type="password" placeholder="Your Password..." />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
