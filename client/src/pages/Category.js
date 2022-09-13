import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

const Category = () => {
  let {id} = useParams()
  const [singleCategory, setSingleCategory] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:3001/api/categories/${id}`).then((response) => {
      setSingleCategory(response.data);
    });
  }, []);

  return (
    <div>
    <div>ID: {singleCategory.id}. {singleCategory.category_name}</div>
    </div>
  )
}

export default Category