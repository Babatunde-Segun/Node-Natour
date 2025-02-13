const User = require('./../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = async (req, res) => {
  const user = await User.find();

  res.status(200).json({
    requestTime: req.requestTime,
    status: 'success',
    results: user.length,

    data: {
      user,
    },
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'Internal Error',
    message: 'This route is not yet defined',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'Internal Error',
    message: 'This route is not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'Internal Error',
    message: 'This route is not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'Internal Error',
    message: 'This route is not yet defined',
  });
};
