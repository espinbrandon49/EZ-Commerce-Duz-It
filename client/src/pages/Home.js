import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import ListGroup from 'react-bootstrap/ListGroup';

//update a product button if you are the user that created it
//delete a product button if you are the user that created it

const Home = () => {
  const [categories, setCategories] = useState([])
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate()
  console.log(categories)
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    } else {
      axios.get('http://localhost:3001/api/categories').then((response) => {
        setCategories(response.data)
      })
      navigate('/')
    }
  }, [])

  return (
    <ListGroup className='container'>
      {categories.map((value, key) => {
        return (
          <ListGroup.Item action variant="primary"
            key={value.id}
            className="category"
            onClick={() => { navigate(`/category/${value.id}`) }}
          >
            {value.category_name} {value.username === authState.username && "*" + value.username}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}
export default Home