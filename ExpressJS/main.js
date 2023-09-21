const express = require ('express')
const app = express()
const PORT = 3000
app.use(express.json());
const dataBase = [];

let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
  ];

app.get('/products', (req, res) => {
    res.json(products);
  })

  
 // product by ID 
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id); // Convert the parameter to an integer
  const product = products.find((p) => p.id === productId); // Use find to search for the product by its ID

  if (product) {
    res.status(200).send(product); // Send the product as JSON
  } else {
    res.status(404).send('No product found');
  }
});

  // Product search
  app.get('/products/p/search', (req, res) => {
    const {q , maxPrice, minPrice} = req.query;
    const result = products.filter((p)=> (p.name.toLowerCase().includes(q.toLowerCase())&&(p.price >= minPrice && p.price <= maxPrice)));;
      res.send(result)
    });

// create new product 
app.post('/products', (req, res) => {
  const {name, price} = req.body;
  const newProduct = {id: products.length + 1, name, price};
  products.push(newProduct);
  res.status(201).send((newProduct) + 'added successfully !! ')

})


// allow users to update the details of a specific product.

app.put('/products/:id', (req, res) => {
  // 1. Get the product ID from the URL parameter and convert it to an integer
  const productId = parseInt(req.params.id);

  // 2. Get the updated product data from the request body
  const updatedProductData = req.body;

  // 3. Find the index of the product with the matching ID in the 'products' array
  const indexOfProduct = products.findIndex((product) => product.id === productId);

  // 4. Check if the product with the given ID was found
  if (indexOfProduct === -1) {
    // 5. If not found, send a 404 status with an error message
    res.status(404).send('Product not found');
  } else {
    // 6. If found, update the product data in the 'products' array
    //    by creating a new object with the updated data
    products[indexOfProduct] = { ...products[indexOfProduct], ...updatedProductData };

    // 7. Send a 201 status (Created) with the updated product data
    res.status(201).send(products[indexOfProduct]);
  }
});

app.delete('/products/:id',(req , res) => {
  const ProductId = parseInt(req.params.id) ;
  const IndexOfProduct = products.findIndex((p) => p.id === ProductId);
  if(IndexOfProduct === -1){
      res.status(404).send('there is nothing to delete');
  }else{
      const DeleteProduct = products.splice(IndexOfProduct , 1);
      res.status(201).send('item Deleted');
  }
  
});

app.listen(PORT,() => {
    console.log(`Server is listening on ${PORT}`);
  });