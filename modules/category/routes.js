const express = require('express');
const categoryController = require('./controllers/category');
const authController = require('../auth/controllers/auth');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, categoryController.getAllCategory)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.createCategory
  );

router
  .route('/:id')
  .get(authController.protect, categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  );

module.exports = router;
