module.exports = function (product) {
  return {
    id: product._id,
    category: product.category,
    description: product.description,
    imageUrl: product.image_url,
    animal: product.animal,
    price: product.price,
    quantity: product.quantity,
    name: product.name,
  };
};
