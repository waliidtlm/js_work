const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'iPhone', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  { id: 6, name: 'iPhone 12', price: 500 }, // Corrected product name
];

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((x) => x.id === id);
  if (product) {
    res.status(200).send(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.get('/products/search', (req, res) => {
  const { q, maxPrice, minPrice } = req.query;
  const searchItems = products.filter(
    (x) =>
      x.name.toLowerCase().includes(q.toLowerCase()) &&
      x.price >= parseFloat(minPrice) &&
      x.price <= parseFloat(maxPrice)
  );
  res.send(searchItems);
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).send(newProduct);
});

app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProductData = req.body;
  const indexOfProduct = products.findIndex((x) => x.id === productId);
  if (indexOfProduct === -1) {
    res.status(404).send('Product not found');
  } else {
    products[indexOfProduct] = { ...products[indexOfProduct], ...updatedProductData };
    res.status(200).send(products[indexOfProduct]);
  }
});

app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const indexOfProduct = products.findIndex((x) => x.id === productId);
  if (indexOfProduct === -1) {
    res.status(404).send('Product not found');
  } else {
    const deletedProduct = products.splice(indexOfProduct, 1);
    res.status(200).send('Item Deleted');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
