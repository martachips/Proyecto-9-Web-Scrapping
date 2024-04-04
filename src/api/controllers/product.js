const Product = require('../models/product');

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

module.exports = { getProducts };
