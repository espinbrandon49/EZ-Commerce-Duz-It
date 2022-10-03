import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const styles = {
  image: {
    width: "200px",
    height: "200px",
  },
}

const Category = () => {
  let { id } = useParams();
  const [singleCategory, setSingleCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState({})
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3001/api/categories/${id}`).then((response) => {
      setSingleCategory(response.data);
    });

    axios.get(`http://localhost:3001/api/products/${id}`).then((response) => {
      setProducts(response.data);
    });

    axios.get(`http://localhost:3001/api/tags`).then((response) => {
      setTags(response.data);
    });
  }, []);

  // let productTagId;
  // if (tags.length > 0) {
  //   productTagId = tags.filter((value, key) => value.tag_name === singleCategory.category_name)[0].id.toString()
  // }
  // useEffect(() => {
  //   //make productTagId stateful?
  // }, [])

  console.log(products)
  console.log(tags)

  const initialValues = {
    image: "rangerTab.png",
    product_name: "",
    username: authState.username,
    price: "",
    stock: "",
    category_id: id,
    userId: authState.id,
    tagIds: [],
  };

  const validationSchema = Yup.object().shape({
    product_name: Yup.string().min(3).max(15).required("Product names are 3-15 characters long"),
    price: Yup.number().required("Price is a number").positive(),
    stock: Yup.number().required("Stock is an integer").positive().integer(),
    tagIds: Yup.number("Please Select A Tag").required("Please Select A Tag"),
  });

  const onSubmit = (data, { resetForm }) => {
    console.log(data)
    console.log(data.tagIds)
    sendImage()
    axios
      .post("http://localhost:3001/api/products", // data,
        {
          image: image.name.replace(/\s/g, '').toLowerCase(),
          product_name: data.product_name,
          username: authState.username,
          price: data.price,
          stock: data.stock,
          category_id: id,
          userId: authState.id,
          tagIds: data.tagIds,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const productToAdd = response.data;
          setProducts([...products, data]);
          window.location.replace(`http://localhost:3000/category/${id}`)
          navigate(`/category/${id}`)
          resetForm();
        }
      });
  };

  //IMAGE POST //IMAGE POST //IMAGE POST //IMAGE POST //IMAGE POST
  const fileOnChange = (event) => {
    setImage(event.target.files[0])
  }

  const sendImage = (event) => {
    // event.preventDefault()
    console.log(image)
    let formData = new FormData()
    formData.append('image', image)
    axios
      .post("http://localhost:3001/api/products/upload", formData, {})
      .then((response) => {
        console.log(response)
      })
  }

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3001/api/products/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setProducts(
          products.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const deleteCategory = (id) => {
    if (products.length > 0) {
      alert("Cannot Delete Categories With Products")
    } else {
      axios
        .delete(`http://localhost:3001/api/categories/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          navigate('/')
        })
    }
  }

  const editCategoryName = (defaultValue) => {
    let newCategoryName = prompt('Enter new category name', defaultValue);
    axios
      .put("http://localhost:3001/api/categories/categoryName", {
        newCategoryName: newCategoryName,
        id: id
      },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );
    setSingleCategory({ ...singleCategory, category_name: newCategoryName })
  }

  const editProduct = (field, defaultValue, pid) => {
    if (field === "product_name") {
      let newProductName = prompt('Enter new product name', defaultValue);
      axios
        .put("http://localhost:3001/api/products/productName", {
          newProductName: newProductName,
          id: pid
        },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );
      setProducts([...products])
    } else if (field === "price") {
      let newProductPrice = prompt('Enter new price', defaultValue);
      axios
        .put("http://localhost:3001/api/products/productPrice", {
          newProductPrice: newProductPrice,
          id: pid
        },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then(() => {
          setProducts([...products,]);
        });
    } else {
      let newStock = prompt('Enter new stock count', defaultValue);
      axios
        .put("http://localhost:3001/api/products/stock", {
          newStock: newStock,
          id: pid
        },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );
    }
    window.location.replace(`http://localhost:3000/category/${id}`)
    // navigate(`/category/${id}`)
  }
  return (
    <div className="container">

      <div className="mb-3">
        <h2
          className="display-3"
          onClick={() => {
            if (authState.username === singleCategory.username) {
              editCategoryName(singleCategory.category_name)
            }
          }}
        >
          {singleCategory.category_name}
        </h2>
        {authState.username === singleCategory.username &&
          <button
            onClick={
              () => { deleteCategory(singleCategory.id) }
            }
            className="btn btn-outline-danger"
          >
            Delete Category
          </button>
        }
      </div>

        <div className="d-flex flex-wrap justify-content-center">
          {products.map((value, key) => {
            return (
              <Card key={key} style={{ width: '18rem' }} className="m-3" >

                <Card.Img variant="top" src={`http://localhost:3001/public/image-${value.image}`} alt={`product that is a ${value.product}`} />

                <Card.Body
                  className="productName"
                  onClick={() => {
                    if (authState.username === value.username) {
                      editProduct("product_name", value.product_name, value.id)
                    }
                  }}
                >
                  <Card.Title>{value.product_name}</Card.Title>
                </Card.Body>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item
                    onClick={() => {
                      if (authState.username === value.username) {
                        editProduct("price", value.price, value.id)
                      }
                    }}
                  >
                    Price: ${value.price}
                  </ListGroup.Item>

                  <ListGroup.Item
                    className="productStock"
                    onClick={() => {
                      if (authState.username === value.username) {
                        editProduct("stock", value.stock, value.id)
                      }
                    }}
                  >Stock: {value.stock}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {tags
                      .filter((tag) => {
                        let x = tag.products.map((el) => el.product_name);
                        if (x.includes(value.product_name)) {
                          return tag.tag_name;
                        }
                      })
                      .map((el) => <span>{el.tag_name}, </span>)}
                  </ListGroup.Item>

                </ListGroup>

                <Card.Body>
                  {authState.username === value.username &&
                    <button
                      variant="danger"
                      onClick={() => deleteProduct(value.id)}
                      className="btn btn-outline-danger"
                    >
                      Remove
                    </button>}
                </Card.Body>

              </Card>
            );
          })}
        </div>

        <div className="border border-primary p-3 mb-3">
          <h3 className="display-6 mb-3">Add A Product</h3>
          <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form className="container">

              <div className="form-floating mb-3">
                <Field autoComplete="off"
                  className="form-control border border-info"
                  id="product_nameInput" name="product_name" placeholder="(Ex. Navy Blue Shorts...)" />
                <label>Product</label>
                <ErrorMessage name="product_name" component="div" div />
              </div>
              <div className="form-floating mb-3">
                <Field autoComplete="off"
                  className="form-control border border-info"
                  id="priceInput" name="price" placeholder="(Ex.10...)" />
                <label>Price</label>
                <ErrorMessage name="price" component="div" />
              </div>
              <div className="form-floating mb-3">
                <Field autoComplete="off"
                  className="form-control border border-info"
                  id="stock_nameInput" name="stock" placeholder="(Ex. 10...)" />
                <label>Stock</label>
                <ErrorMessage name="stock" component="" />
              </div>

              {/* <div id="checkbox-group">Tags</div> */}
              <ErrorMessage name="tagIds" component="div" />
              <div className="mb-3">
                {tags.map((tag, key) => {
                  return (
                    <div className="form-check form-check-inline">
                      <Field className="form-check-input" type="checkbox" name="tagIds" value={tag.id.toString()} />
                      <label className="form-check-label" key={key}>{tag.tag_name}</label>
                    </div>
                  );
                })}
              </div>

              <input id="file" name="file" type="file" onChange={fileOnChange} className="mb-3" />
              <br />

              <button type="submit" className="btn btn-outline-primary">Add Product</button>

            </Form>
          </Formik>
        </div>

    </div>
  );
};

export default Category;
