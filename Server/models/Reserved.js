const mongoose = require("mongoose");
const BasketItem = require("./BasketItemSchema");

const ReservedSchema = mongoose.Schema(
  {
    buyer: { type: String },
    phone_number: { type: String },
    basket: [BasketItem],
  },

  { timestamps: true }
);

const Reserved = mongoose.model("Reserved", ReservedSchema);

module.exports = Reserved;
