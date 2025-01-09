const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// ROUTE HANDLERS
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Something went wrong',
      message: 'Bad connection',
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      requestTime: req.requestTime,
      status: 'success',
      results: tours.length,

      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'Something went wrong',
      message: 'Try again',
    });
  }
};

exports.createTour = async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save()

  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'Welcome',
  });
};
