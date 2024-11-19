const express = require('express');
const morgan = require('morgan');

const tourRoutes = require('./../4-NATOURS/routes/tourRoutes');
const userRoutes = require('./../4-NATOURS/routes/userRoutes');

// middleware
const app = express();

// app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware😄🙂🙂');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTE
app.use('/api/vi/users', userRoutes);
app.use('/api/vi/tours', tourRoutes);

// SERVER
const port = 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Checking
// app.post('/api/v1/tours', (req, res) => {
//   res.status(201).json({
//     status: 'success',
//     data: {toures}
//   })

// })
