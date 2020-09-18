const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./modules/utils/error/controller/error');
const AppError = require('./modules/utils/error/appError');
const userRouter = require('./modules/user/routes');
const connectDB = require('./config/db');
const categoryRouter = require('./modules/category/routes');

const app = express();

// Connect Database
connectDB();

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// middlewares
app.use(express.json());

// Routes
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/users', userRouter);

// Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
