const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// console.log('this is morgan', morgan);

const tourRoutes = require('./../4-NATOURS/routes/tourRoutes');
const userRoutes = require('./../4-NATOURS/routes/userRoutes');

// middleware
const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTE
app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

// Handle error for undefined route
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
