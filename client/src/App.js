import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import Category from "./pages/Category";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/auth', {
      headers:  {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    })    
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <Link to="/addcategory">Add A Category</Link> <br />
          <Link to="/">Home Page</Link> <br />
          {!authState && (
            <>
              <Link to="/login">Login</Link> <br />
              <Link to="/registration">Registration</Link>
              <br />
              <br />
            </>
          )}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/addcategory" exact element={<AddCategory />} />
            <Route path="/category/:id" exact element={<Category />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="login" exact element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
