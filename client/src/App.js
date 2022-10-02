import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import AddTag from "./pages/AddTag";
import Category from "./pages/Category";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
// username can be accessed everywhere by importing {AuthContext} and using {authState}

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
    window.location.replace("http://localhost:3000/")
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar bg="primary" variant="dark" expand="md" className="mb-3">
            <Container>
              <Navbar.Brand href="/">React-Commence</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {!authState.status ? (
                    <>
                      <Nav.Link ><Link className='link' to="/login">Login</Link></Nav.Link>
                      <Nav.Link><Link className='link' to="/registration">Registration</Link></Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link><Link className='link' to="/addcategory">Add A Category</Link></Nav.Link>
                      <Nav.Link><Link className='link' to="/addtag">Add A Tag</Link></Nav.Link>
                      <Nav.Link><Link className='link' to="/">Home Page</Link></Nav.Link>
                    </>
                  )}
                  {authState.status &&
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                      <Nav.Link><Link className='dropdown-item' to={`/profile/${authState.id}`}>{authState.username}</Link></Nav.Link>
                      <Nav.Link><button className="btn btn-outline-primary" onClick={logout}>Logout</button></Nav.Link>
                    </NavDropdown>}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/addcategory" exact element={<AddCategory />} />
            <Route path="/addtag" exact element={<AddTag />} />
            <Route path="/category/:id" exact element={<Category />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div >
  );
}

export default App;

//Add description to products (maybe)
//Add images to categories
//Add icons to tags
//searchable
//preview images
//CRUD images

//bugs
  //bootstrap
  //readme
  //Product tags do not populate immediately, need to reload
  //products can't be deleted immediately, need to reload