const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category must have a name'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    parentId: String,
  },
  { timestamps: true }
);

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
