const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));

// if a 'post' request is sent to an end point (login for example) and json data is sent
// then this line of code takes the json data and parses it into a javascript object and
// attaches it to the request(req) object inside the route handler in the authController file.
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

// database connection
const dbURI = 'mongodb://localhost/node_auth_db';
// const dbURI = 'mongodb+srv://admin_doran:<password>@sandbox01-rxraq.mongodb.net/node_auth_db';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('Connected to MongoDB'.yellow);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {
  // res.setHeader('Set-Cookie', 'newUser=true');

  // use cookie-parser
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send('you got the cookie!');
});

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  console.log(cookies.newUser);

  res.json(cookies);
});
