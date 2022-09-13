import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

const Home = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/categories').then((response) => {
      setCategories(response.data)
    })
  }, [])

  return (
    <div>
      {categories.map((value, key) => {
        return (
          <div key={value.id}>
            <div >{value.category_name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Home