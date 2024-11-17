const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
// console.log(morgan);

const tourRoutes = require('./../4-NATOURS/routes/tourRoutes');
const userRoutes = require('./../4-NATOURS/routes/userRoutes');

// middleware
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware😄🙂🙂');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res
//     .status(400)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can send to this endpoint...');
// });

// Files

// app.get('/api/v1/tours', getTour);

// app.post('/api/v1/tours', createTour);
// x

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
