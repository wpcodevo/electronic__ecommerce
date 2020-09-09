const catchAsync = require('../../utils/error/catchAsync');
const AppError = require('../../utils/error/appError');
const User = require('../models/user');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  //   const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users: 'It worked',
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  console.log(newUser);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('No document found with that id'), 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('No document found with that id'), 404);
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No document found with that id'), 404);
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
