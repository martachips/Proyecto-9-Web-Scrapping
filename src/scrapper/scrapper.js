const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Product = require('../api/models/product');
const fs = require('fs');

const arrayProducts = [];

const scrapper = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const productsFeatured = await page.$$('product-card.product-card');
    console.log(productsFeatured.length);

    for (let i = 0; i < productsFeatured.length; i++) {
      const products = productsFeatured[i];
      const images = await products.$eval('img', (e) => e.src);
      const title = await products.$eval('a[title]', (e) =>
        e.getAttribute('title')
      );
      const priceString = await products.$eval(
        'span.price ins span.amount',
        (e) => e.textContent.trim()
      );

      const cleanedPriceString = priceString.replace(/[^\d,.]/g, '');
      const priceWithDecimals = cleanedPriceString.replace(',', '.');
      const price = parseFloat(priceWithDecimals);

      const productObject = {
        title,
        img: images,
        price
      };

      arrayProducts.push(productObject);
    }
    await mongoose
      .connect(process.env.DB_URL)
      .then(async () => {
        const allProducts = await Product.find();
        if (allProducts.length) {
          await Product.collection.drop();
        }
      })
      .catch((error) => console.log(`Error deleting data: ${error}`))
      .then(async () => {
        await Product.insertMany(arrayProducts);
        console.log('Inserted');
      })
      .catch((error) => console.log(`Error creating data: ${error}`))
      .finally(() => {
        mongoose.disconnect();
        browser.close();
      });

    //! (function "write" creates products.json file)
    write(arrayProducts);
  } catch (error) {
    console.log(error);
  }
};

scrapper('https://matchaandco.com/collections/te-matcha');

const write = (products) => {
  fs.writeFile('products.json', JSON.stringify(products), () => {
    console.log('Aparcao');
  });
};

module.exports = { scrapper };
