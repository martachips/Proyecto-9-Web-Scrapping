require('dotenv').config();
const express = require('express');
const { scrapper } = require('./src/scrapper/scrapper');
const { connectDB } = require('./src/config/db');
const productRoute = require('./src/api/routes/product');

const app = express();

connectDB();

app.use('/api/v1/tes', productRoute);

app.use('*', (req, res) => {
  return res.status(404).json('Route not found');
});

app.listen(3000, () => {
  console.log('Server running in http://localhost:3000');
});
