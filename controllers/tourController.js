const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// ROUTE HANDLERS
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
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
    // BUILD QUERY
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // {difficulty: 'easy', duration: {$gte: 5}}
    // gte, gt, lte, lt

    // execute query
    // console.log(req.query, 'this is queryObj', queryObj);

    const query = Tour.find(JSON.parse(queryStr));

    const tours = await query;
    // .where('duration')
    // .lte(4.5)
    // .where('difficulty')
    // .equals('easy');
    // const query = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    //   ratingsAverage: 4.4,
    // });
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
      message: error,
    });
  }
};

// UPDATE TOUR NEVER DAY WORK
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(tour);
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Something went wrong.',
    });
  }
};
