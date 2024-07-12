const mongoose = require("mongoose");
const CategoriesSchema = mongoose.Schema({
  for_animal: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Categories = mongoose.model("categories", CategoriesSchema);

module.exports = Categories;
