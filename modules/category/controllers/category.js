const Category = require('../models/category');
const catchAsync = require('../../utils/error/catchAsync');
const AppError = require('../../utils/error/appError');

const createCategories = (categories, parentId = null) => {
  const categoriesList = [];

  let category;
  if (parentId === null) {
    category = categories.filter((cat) => cat.parentId === undefined);
  } else {
    category = categories.filter((cat) => cat.parentId === parentId);
  }

  category.forEach((cat) => {
    categoriesList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      children: createCategories(categories, cat._id),
    });
  });

  return categoriesList;
};

exports.createCategory = catchAsync(async (req, res, next) => {
  const categoryObj = {
    name: req.body.name,
    slug: req.body.slug,
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const newCategory = await Category.create(categoryObj);

  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory,
    },
  });
});

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  const categoryList = createCategories(categories);

  res.status(200).json({
    status: 'success',
    data: {
      categories: categoryList,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return next(new AppError('No document found with this ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category)
    return next(new AppError('No document found with this ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category)
    return next(new AppError('No document found with this ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
