const mongoose = require("mongoose");

const BasketItemSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  reservedquantity: { type: Number },
});

module.exports = BasketItemSchema;
