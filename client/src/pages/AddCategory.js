import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddCategory = () => {

  let navigate = useNavigate()

  const initialValues = {
    category_name: ""
  }

  const validationSchema = Yup.object().shape({
    category_name: Yup.string().min(3).max(15).required("Category names are 3-15 characters long")
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/api/categories', data).then((response) => {
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