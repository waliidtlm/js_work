const express = require ('express')
const app = express()
const bcrypt = require('bcrypt')
const session = require('express-session')
const port = 3000;

const users = []; 

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(409).send('Username already exists');
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the username and hashed password in the users array
    users.push({ username, password: hashedPassword });

    res.status(201).send('Registration successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.use(session({
    secret: 'gdmD14uRT207',
    resave: false,
    saveUninitialized: true,
  }));
  app.post('/login', (req, res) => {
    req.session.userId = uniqueUserId;
    res.redirect('/dashboard');
  });
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/login');
    });
  });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
