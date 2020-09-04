const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

module.exports = app;
