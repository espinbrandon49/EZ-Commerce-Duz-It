import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from "../helpers/AuthContext";

const AddCategory = () => {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])

  const initialValues = {
    category_name: "",
    username: authState.username
  }

  const validationSchema = Yup.object().shape({
    category_name: Yup.string().min(3).max(15).required("Category names are 3-15 characters long")
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/api/categories', data).then((response) => {
      console.log(response.data)
      navigate('/')
    });
  };

  return (
    <div className='addCategoryPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}  >
        <Form>
          <label >Category: </label>

          <Field
            autoComplete='off'
            id="categoryInput"
            name="category_name"
            placeholder="(Ex. T-shirts...)"
          />
          <button type='submit'>Add A Category</button>
          <ErrorMessage name="category_name" component='div' />
        </Form>
      </Formik>
    </div>
  )
}

export default AddCategory