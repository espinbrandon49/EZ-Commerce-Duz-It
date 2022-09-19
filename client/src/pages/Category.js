import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext";

const Category = () => {
  let { id } = useParams();
  const [singleCategory, setSingleCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
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

  const initialValues = {
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
  });

  const onSubmit = (data, { resetForm }) => {
    axios
      .post("http://localhost:3001/api/products", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const productToAdd = response.data;
          console.log(productToAdd);
          setProducts([...products, data]);
          console.log(products);
          resetForm();
        }
      });
  };

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

  return (
    <div>
      <div>
        <h1>
          CATEGORY ID: {singleCategory.id}. {singleCategory.category_name}
        </h1>
        {authState.username === singleCategory.username &&
          <button onClick={
            () => { deleteCategory(singleCategory.id) }
          }>
            Delete Category
          </button>
        }
      </div>
      <div>
        <h2>PRODUCTS</h2>
        <div>
          Available
          {products.map((value, key) => {
            return (
              <div key={key}>
                <div>
                  Product ID: {value.id}. {value.product_name}
                </div>
                <div>${value.price}</div>
                <div>in Stock: {value.stock} </div>
                <h3>
                  PRODUCT TAGS:
                  {tags
                    .filter((tag) => {
                      let x = tag.products.map((el) => el.product_name);
                      if (x.includes(value.product_name)) {
                        return tag.tag_name;
                      }
                    })
                    .map((el) => el.tag_name)}
                </h3>
                {authState.username === value.username && <button onClick={() => deleteProduct(value.id)}> X</button>}
              </div>
            );
          })}
        </div>
        <div>
          <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form>
              <label>Product</label>
              <Field autoComplete="off" id="product_nameInput" name="product_name" placeholder="(Ex. Navy Blue Shorts...)" />
              <ErrorMessage name="product_name" component="span" />
              <br />
              <label>Price</label>
              <Field autoComplete="off" id="priceInput" name="price" placeholder="(Ex.10...)" />
              <ErrorMessage name="price" component="span" />
              <br />
              <label>Stock</label>
              <Field autoComplete="off" id="stock_nameInput" name="stock" placeholder="(Ex. 10...)" />
              <ErrorMessage name="stock" component="span" />
              <br />
              <div id="checkbox-group">Tags</div>
              <div>
                {tags.map((tag, key) => {
                  return (
                    <label key={key}>
                      <Field type="checkbox" name="tagIds" value={tag.id.toString()} />
                      {tag.tag_name}
                    </label>
                  );
                })}
              </div>
              <button type="submit">Add A Product</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Category;
