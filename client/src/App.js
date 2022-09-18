import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import AddTag from "./pages/AddTag";
import Category from "./pages/Category";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound"
import { AuthContext } from "./helpers/AuthContext";
// username can be accessed everywhere by importing {AuthContext} and using authState.username
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };
  
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Link to="/addcategory">Add A Category</Link> <br />
          <Link to="/addtag">Add A Tag</Link> <br />
          <Link to="/">Home Page</Link> <br />
          {!authState.status ? (
            <>
              <Link to="/login">Login</Link> <br />
              <Link to="/registration">Registration</Link>
              <br />
              <br />
            </>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
          <h1>{authState.username}</h1>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/addcategory" exact element={<AddCategory />} />
            <Route path="/addtag" exact element={<AddTag />} />
            <Route path="/category/:id" exact element={<Category />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="login" exact element={<Login />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

//display product's tags immediately, currently needs refresh
//delete a category
//update products

//create PageNotFound
//create AddTag