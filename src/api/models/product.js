const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true }
  },
  {
    timestamps: true,
    collection: 'products'
  }
);

const Product = mongoose.model('products', productSchema, 'products');

module.exports = Product;
