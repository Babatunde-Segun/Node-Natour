const express = require('express');
const morgan = require('morgan');

// console.log('this is morgan', morgan);

const tourRoutes = require('./../4-NATOURS/routes/tourRoutes');
const userRoutes = require('./../4-NATOURS/routes/userRoutes');

// middleware
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware😄🙂🙂');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTE
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;
