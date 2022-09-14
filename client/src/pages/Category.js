import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Category = () => {

  let { id } = useParams();
  const [singleCategory, setSingleCategory] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/categories/${id}`).then((response) => {
      setSingleCategory(response.data);
    });

    axios.get(`http://localhost:3001/api/products/${id}`).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const initialValues = {
    product_name: "",
    price: "",
    stock: "",
    category_id: id,
    tagIds: [],
  };

  const validationSchema = Yup.object().shape({
    product_name: Yup.string().min(3).max(15).required("Product names are 3-15 characters long"),
  });

  const onSubmit = (data, {resetForm}) => {
    axios.post("http://localhost:3001/api/products", data).then((response) => {
      const productToAdd = response.data;
      console.log(productToAdd);
      setProducts([...products, productToAdd]);
      resetForm()
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
              </div>
            );
          })}
        </div>
        <div>
          <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form>
              <label>Product</label>
              <Field autoComplete="off" id="product_nameInput" name="product_name" placeholder="(Ex. Navy Blue Shorts...)" />
              <Field autoComplete="off" id="priceInput" name="price" placeholder="(Ex.10...)" />
              <Field autoComplete="off" id="stock_nameInput" name="stock" placeholder="(Ex. 10...)" />
              <button type="submit">Add A Product</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Category;
