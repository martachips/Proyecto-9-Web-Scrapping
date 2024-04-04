const { getProducts, postProduct } = require('../controllers/product');
const productRoute = require('express').Router();

productRoute.post('/', postProduct);
productRoute.get('/', getProducts);

module.exports = productRoute;
