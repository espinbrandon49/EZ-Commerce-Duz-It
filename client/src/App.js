import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {
const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/api/categories').then((response) => {
      setCategories(response.data)
    })
  }, [])

  return (
    <div className="App">
     {categories.map((value, key) => {
      return(
        <div key={value.id}>
          <div >{value.category_name}</div>
        </div>
      )
     })}
    </div>
  );
}

export default App;
