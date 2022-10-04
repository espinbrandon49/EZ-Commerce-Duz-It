import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import ListGroup from 'react-bootstrap/ListGroup';

const Home = () => {
  const [categories, setCategories] = useState([])
  // const [products, setProducts] = useState([])
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
      // axios.get('http://localhost:3001/api/products').then((response) => {
      //   setProducts(response.data)
      // })
      navigate('/')
    }
  }, [])

  // console.log(products)

  return (
    <ListGroup className='container text-center'>
      {categories.map((value, key) => {
        return (
          <ListGroup.Item action variant="primary"
            key={value.id}
            className="category"
            onClick={() => { navigate(`/category/${value.id}`) }}
          >
            {/* {value.category_name} {value.username === authState.username && "*" + value.username} */}
            {value.category_name} {value.username === authState.username &&"*"}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}
export default Home