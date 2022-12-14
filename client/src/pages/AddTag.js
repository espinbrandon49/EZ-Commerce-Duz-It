import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const AddTag = () => {

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
    tag_name: Yup.string().min(3).max(15).required("Tag names are 3-15 characters long")
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/api/tags', data).then((response) => {
      navigate('/')
    });
  };

  return (
    <div className='addCategoryPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}  >
        <Form className='container'>
          <div className='form-floating mb-3'>
          <Field
            autoComplete='off'
            id="tagInput"
            name="tag_name"
            className="form-control"
          />
          <label>Tag Name</label>
          <ErrorMessage name="tag_name" component='div' />
          </div>
          <button type='submit' className="btn btn-outline-primary">Add A Tag</button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddTag