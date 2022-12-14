const { Product } = require('../models');

const productData = [
  {
    product_name: 'Plain T-Shirt',
    username: 'MichaelScott',
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    product_name: 'Colorful T-Shirt',
    username: 'MichaelScott',
    price: 18.99,
    stock: 2,
    category_id: 1,
  },
  {
    product_name: 'Running Sneakers',
    username: 'MichaelScott',
    price: 90.0,
    stock: 25,
    category_id: 5,
  },
  {
    product_name: 'Branded Baseball Hat',
    username: 'MichaelScott',
    price: 22.99,
    stock: 12,
    category_id: 4,
  },
  {
    product_name: 'Top 40 Music Compilation Vinyl Record',
    username: 'MichaelScott',
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    product_name: 'Cargo Shorts',
    username: 'MichaelScott',
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
