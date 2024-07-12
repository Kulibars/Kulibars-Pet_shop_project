const mongoose = require("mongoose");
const mapProduct = require("./mapProduct");
module.exports = function (reserved) {
  return {
    id: reserved._id,
    createdAt: reserved.createdAt,
    buyer: reserved.buyer,
    phoneNumber: reserved.phone_number,
    basket: reserved.basket.map(({ product, reservedquantity }) => ({
      product: mapProduct(product),
      reservedquantity,
    })),
  };
};
