const { getProducts } = require('../controllers/product');
const productRoute = require('express').Router();

productRoute.get('/', getProducts);

module.exports = productRoute;
