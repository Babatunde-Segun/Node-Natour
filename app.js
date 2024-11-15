const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
// console.log(morgan);

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
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// console.log(tours);

// ROUTE HANDLERS
const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length || !tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    requestTime: req.requestTime,
    success: 'success',
    data: {
      tours,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send('Done');
};

const updateTour = (req, res) => {
  console.log(req.params.id);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tours',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Not found',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getTour);

// app.post('/api/v1/tours', createTour);
// x

// ROUTE

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

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
