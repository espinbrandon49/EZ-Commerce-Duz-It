import React from 'react'
import {Link} from "react-router-dom"

const PageNotFound = () => {
  return (
    <div>
      <h1>PageNotFound</h1>
      <h3>Try this link: <Link to="/">Home Page</Link></h3>

      </div>
  )
}

export default PageNotFound