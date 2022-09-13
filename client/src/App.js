import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import AddCategory from "./pages/AddCategory";

function App() {
  return (
    <div className="App">
      <Router>
        <Link to='/addcategory'>Add A Category</Link>
        <Link to='/'>Home Page</Link>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/addcategory" exact element={<AddCategory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
