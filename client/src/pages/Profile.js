import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

  const styles = {
    width: {
      width: "200px",
      height: "200px"
    },
  };
  
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
    <div className="container text-center">
      <div className="basicInfo">
        <h2 className="display-2">{username}</h2>
        <img src="https://images.unsplash.com/photo-1631287381310-925554130169?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGlraW5nJTIwYm9vdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" style={styles.width} alt=" "/>
      </div>

      <div >
        <h2 className="display-6">All User Products</h2>
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

      <div >
        <h2 className="display-6">All User Categories</h2>
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

      <div >
        <h2 className="display-6">All Categories</h2>
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