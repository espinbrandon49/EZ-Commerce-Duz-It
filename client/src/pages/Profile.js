import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//all categories in a sidebar
  //onclick go to category(done)
//single user categories in a sidebar
  //onclick update user categories
//main display products
  //products have tags
  
const Profile = () => {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [userCategories, setUserCategories] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/api/categories/byuserId/${id}`).then((response) => {
      setUserCategories(response.data);
    });

    axios.get(`http://localhost:3001/api/products/productbyuserId/${id}`).then((response) => {
      // console.log(response.data)
      setUserProducts(response.data);
    });

    axios.get("http://localhost:3001/api/categories").then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  return (
    <div>
      <div className="basicInfo">
        <h1>{username}</h1>
      </div>

      <div className="listOfUserProducts">
        <h2>All User Products</h2>
        {userProducts.map((value, key) => {
          return (
            <div
              key={value.id}
              className="allProducts"
              onClick={() => {
                navigate(`/category/${value.category_id}`);
              }}
            >
              <div>{value.product_name}</div>
            </div>
          );
        })}
      </div>

      <div className="listOfCategories">
        <h2>All User Categories</h2>
        {userCategories.map((value, key) => {
          return (
            <div
              key={value.id}
              className="userCategory"
              onClick={() => {
                navigate(`/category/${value.id}`);
              }}
            >
              <div>Cat. Id - {value.id} {value.category_name}</div>
            </div>
          );
        })}
      </div>

      <div className="listOfCategories">
        <h2>All Categories</h2>
        {allCategories.map((value, key) => {
          return (
            <div
              key={value.id}
              className="allCategory"
              onClick={() => {
                navigate(`/category/${value.id}`);
              }}
            >
              <div>Cat. Id - {value.id} {value.category_name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
