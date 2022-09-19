import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";

const Home = () => {
  const [categories, setCategories] = useState([])
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate()

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
    <div>
      {categories.map((value, key) => {
        return (
          <div
            key={value.id}
            className="category"
            onClick={() => { navigate(`/category/${value.id}`) }}
          >
            <div >{value.category_name} - {value.username}

            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Home