import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3001/api/categories').then((response) => {
      setCategories(response.data)
    })
  }, [])

  return (
    <div>
      {categories.map((value, key) => {
        return (
          <div 
            key={value.id} 
            className="category"
            onClick={() => {navigate(`/category/${value.id}`)}}
            >
            <div >{value.category_name}</div>
          </div>
        )
      })}

    </div>
  )
}

export default Home