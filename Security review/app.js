const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const { body, validationResult } = require('express-validator');
const xss = require('xss');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const app = express();
const saltRounds = 10;

const secretKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTU3MTk2MjQsImV4cCI6MTcyNzI1NTYyNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.0h6lAUcNL7LrJXUGMqW7w4zA8fxZaXivtIvgw3fusi8"
  

  const users = [
    {
      id: 1,
      username: 'user1',
      password: bcrypt.hashSync('azerty', saltRounds),
      role: 'user',
    },
    {
      id: 2,
      username: 'user2',
      password: bcrypt.hashSync('azerty', saltRounds),
      role: 'user',
    },
    {
      id: 3,
      username: 'admin',
      password: bcrypt.hashSync('qwerty', saltRounds), // Change to the actual admin password
      role: 'admin',
    },
  ];
  

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: secretKey, resave: false, saveUninitialized: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(csurf({ cookie: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { csrfToken: req.csrfToken() });
});

app.post('/login', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const sanitizedData = {
    name: xss(username),
    password: xss(password),
  };

  // Find the user by username
  const user = users.find((u) => u.username === sanitizedData.name);

  if (user) {
    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(sanitizedData.password, user.password, (err, result) => {
      if (result) {
        req.session.isAuthenticated = true;
        res.redirect('/dashboard');
        
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
});

app.get('/dashboard', (req, res) => {
  if (req.session.isAuthenticated) {
    res.render('dashboard');
  } else {
    res.redirect('/');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
