const AppError = require('./../utils/appError');

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDb = (err) => {
  console.log('error form', err);
  const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log('error value', value);
  const message = `Duplicate field value: ${value} , Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDb = (err) => {
  console.log('handdleValidationError', err);
  const errors = Object.values(err.errors).map((el) => el.message);
  // console.log('This is error from hanVali', errors);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error; send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown erro: don't leak error details
  else {
    // 1) Log error
    console.error('Error 🔥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDb(error);
    if (error.code === 11000) error = handleDuplicateFieldsDb(error);
    if (error._message === 'Validation failed') {
      error = handleValidationErrorDb(error);
    }

    sendErrorProd(error, res);
  }
};
