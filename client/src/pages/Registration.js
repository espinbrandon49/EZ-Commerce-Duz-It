import React, {useContext} from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';


const Registration = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  // const {setAuthState} = useContext(AuthContext);
  // const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(14).required("Must be 3-15 characters"),
    password: Yup.string().min(4).max(14).required("must be 4-14 characters"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/api/auth", data).then((response) => {
      console.log(data);
    })
    // .then(() => {
    //   login(data.username, data.password)
    // })
  };

  // function login(data1, data2) {
  //   const data = { username: data1, password: data2 };
  //   axios.post("http://localhost:3001/api/auth/login", data).then((response) => {
  //     if(response.data.error) {
  //       alert(response.data.error);
  //     } else {
  //       localStorage.setItem("accessToken", response.data.token)
  //       setAuthState({
  //         username: response.data.username,
  //         id: response.data.id,
  //         status: true
  //       });
  //       navigate('/')
  //     }
  //   });
  // };

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <label>Username</label>
          <ErrorMessage name="username" component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="(Ex. John123...)" />
          <label htmlFor="">Password</label>
          <ErrorMessage name="password" component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="password" type="password" placeholder="Your Password..." />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
