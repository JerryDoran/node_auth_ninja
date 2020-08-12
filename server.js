const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));

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
