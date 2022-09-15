import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import AddCategory from "./pages/AddCategory";
import Category from "./pages/Category";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to='/addcategory'>Add A Category</Link> <br/>
        <Link to='/'>Home Page</Link> <br/>
        <Link to='/login'>Login</Link> <br/>
        <Link to='/registration'>Registration</Link><br/><br/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/addcategory" exact element={<AddCategory />} />
          <Route path="/category/:id" exact element={<Category />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
