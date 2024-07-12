const Product = require("../models/Product");

async function getProducts(
  searchPhrase = "",
  animal = "",
  category = "",
  minPrice = 0,
  maxPrice = Infinity,
  sortPriceOrder = "desc",
  limit = 12,
  page = 1
) {
  const sortPrise = sortPriceOrder === "desc" ? -1 : 1;
  const [products, count] = await Promise.all([
    Product.find({
      name: { $regex: searchPhrase, $options: "i" },
      animal: { $regex: animal, $options: "i" },
      category: { $regex: category, $options: "i" },
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ price: sortPrise }),

    Product.countDocuments({
      name: { $regex: searchPhrase, $options: "i" },
      animal: { $regex: animal, $options: "i" },
      category: { $regex: category, $options: "i" },
      price: { $gte: minPrice, $lte: maxPrice },
    }),
  ]);

  return { products, lastPage: Math.ceil(count / limit) };
}

async function addProduct({
  category,
  description,
  imageUrl,
  animal,
  price,
  quantity,
  name,
}) {
  const newProduct = await Product.create({
    category,
    description,
    image_url: imageUrl,
    animal,
    price,
    quantity,
    name,
  });

  return newProduct;
}

async function getProduct(id) {
  return Product.findById(id);
}

async function editProduct(id, data) {
  return Product.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
}

function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = {
  getProducts,
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
};
