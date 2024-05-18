const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const instrumentRoutes = require('./routes/instrumentRoutes');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use('/', authRoutes);
app.use('/', instrumentRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});

