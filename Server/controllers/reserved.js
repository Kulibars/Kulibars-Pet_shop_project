const Reserve = require("../models/Reserved");
const Product = require("../models/Product");

async function addReserve({ buyer, basket, phoneNumber }) {
  for (const item of basket) {
    const product = await Product.findById(item.product);
    if (product) {
      product.quantity -= item.reservedquantity;
      if (product.quantity < 0) {
        throw new Error(`Недостаточное количество товара ${product.name}`);
      }
      await product.save();
    }
  }

  const reserved = await Reserve.create({
    buyer,
    basket,
    phone_number: phoneNumber,
  });

  await reserved.save();
}

async function getReserves() {
  const reservedList = await Reserve.find().populate("basket.product");
  return reservedList;
}

async function getReserve(id) {
  return Reserve.findById({ _id: id }).populate("basket.product");
}

function deleteReserve(id) {
  return Reserve.deleteOne({ _id: id });
}

module.exports = {
  addReserve,
  getReserves,
  getReserve,
  deleteReserve,
};
