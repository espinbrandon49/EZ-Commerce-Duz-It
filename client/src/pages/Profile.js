import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

const styles = {
  width: {
    width: "200px",
    height: "200px"
  },
};

const Profile = () => {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [userCategories, setUserCategories] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
      setImage(response.data.image);
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
console.log(username)
  return (
    <div className="container text-center">
      <div className="mb-3">
        <h2 className="display-2">{username}</h2>
        <img src={`http://localhost:3001/public/image-${image}`} style={styles.width} alt=" " />
      </div>

      <div className="mb-3" >
        <h2 className="display-6">Categories*</h2>
        {userCategories.map((value, key) => {
          return (
            <ListGroup action variant="primary"
              key={value.id}
              className="userCategory"
              onClick={() => {
                navigate(`/category/${value.id}`);
              }}
            >
              <ListGroup.Item action variant="primary">
                {value.category_name}
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </div>

      <div className="mb-3" >
        <h2 className="display-6">All Categories</h2>
        {allCategories.map((value, key) => {
          return (
            <ListGroup
              key={value.id}
              className="allCategory"
              onClick={() => {
                navigate(`/category/${value.id}`);
              }}
            >
              <ListGroup.Item action variant="primary">{value.category_name}</ListGroup.Item>
            </ListGroup>
          );
        })}
      </div>

      <div >
        <h2 className="display-6">Products</h2>
        <div className="d-flex justify-content-center flex-wrap">
        {userProducts.map((value, key) => {
          return (
            <Card
              style={{ width: '18rem' }}
              key={value.id}
              className="allProducts m-3"
              onClick={() => {
                navigate(`/category/${value.category_id}`);
              }}
            >
              <Card.Img variant="top" src={`http://localhost:3001/public/image-${value.image}`} />
              <Card.Title>{value.product_name}</Card.Title>
            </Card>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default Profile;