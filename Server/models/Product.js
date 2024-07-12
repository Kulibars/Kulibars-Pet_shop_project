const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },

  animal: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
