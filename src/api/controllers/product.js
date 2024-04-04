const Product = require('../models/product');
const products = require('../../../products.json');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json(`Request error: ${error}`);
  }
};

const postProduct = async (req, res, next) => {
  try {
    await Product.insertMany(products.products);
    return res.status(201).json('Products inserted');
  } catch (error) {
    console.log(error);
    return res.status(400).json(`Request error: ${error}`);
  }
};

module.exports = { getProducts, postProduct };
