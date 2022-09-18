import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
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
  console.log(authState)
  
  useEffect(() => {
    axios.get(`http://localhost:3001/api/categories/${id}`).then((response) => {
      setSingleCategory(response.data);
    });

    axios.get(`http://localhost:3001/api/products/${id}`).then((response) => {
      setProducts(response.data);
    });

    axios.get(`http://localhost:3001/api/tags`).then((response) => {
      setTags(response.data)
    });
  }, []);

  const initialValues = {
    product_name: "",
    username: authState.username,
    price: "",
    stock: "",
    category_id: id,
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
          console.log(productToAdd)
          setProducts([...products, data]);
          console.log(products)
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

  return (
    <div>
      <h1>
        CATEGORY ID: {singleCategory.id}. {singleCategory.category_name}
      </h1>
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
                <h3>PRODUCT TAGS:

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
                {
                  tags.map((tag, key) => {
                    return (
                      <label key={key}>
                        <Field type="checkbox" name="tagIds" value={tag.id.toString()} />
                        {tag.tag_name}
                      </label>
                    )
                  })
                }
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


  //  {/* <label>
  //                 <Field type="checkbox" name="tagIds" value="1" />
  //                 rock music
  //               </label>
  //               <label>
  //                 <Field type="checkbox" name="tagIds" value="2" />
  //                 pop music
  //               </label>
  //               <label>
  //                 <Field type="checkbox" name="tagIds" value="3" />
  //                 blue
  //               </label>
  //               <label>
  //                 <Field type="checkbox" name="tagIds" value="4" />
  //                 red
  //               </label>
  //               <label>
  //                 <Field type="checkbox" name="tagIds" value="5" />
  //                 green
  //               </label>
  //               <label>
  //                 <Field type="checkbox" name="tagIds" value="6" />
  //                 white
  //               </label>
  //               <label>
  //                 <Field type="checkbox" name="tagIds" value="7" />
  //                 gold
  //               </label>
  //               <label>
  //                 <Field type="checkbox" name="tagIds" value="8" />
  //                 poip culture
  //               </label> */}

                // {/* {
                //   tags.map((tag, key) => {
                //     return (
                //       <label key={key}>
                //         <Field type="checkbox" name="tagIds" value={tag.id} />
                //         {tag.tag_name}
                //       </label>
                //     )
                //   })
                // } */}