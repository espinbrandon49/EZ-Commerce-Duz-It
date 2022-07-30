// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Product
Category.hasMany(Product, {
  foreignKey: 'category_id',
})

// Product belongToMany Tag (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag
})

// Tag belongToMany Product (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
