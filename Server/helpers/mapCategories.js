module.exports = function (categories) {
  return {
    id: categories._id,
    forAnimal: categories.for_animal,
    name: categories.name,
    description: categories.description,
  };
};
