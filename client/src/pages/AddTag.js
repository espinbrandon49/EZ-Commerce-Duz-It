import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from "../helpers/AuthContext";

const AddTag = () => {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])

  const initialValues = {
    tag_name: ""
  }

  const validationSchema = Yup.object().shape({
    tag_name: Yup.string().min(3).max(15).required("Category names are 3-15 characters long")
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/api/tags', data).then((response) => {
      navigate('/')
    });
  };

  return (
    <div className='addCategoryPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}  >
        <Form>
          <label >Tags: </label>

          <Field
            autoComplete='off'
            id="tagInput"
            name="tag_name"
            placeholder="(Ex. Office...)"
          />
          <button type='submit'>Add A Tag</button>
          <ErrorMessage name="tag_name" component='div' />
        </Form>
      </Formik>
    </div>
  )
}

export default AddTag