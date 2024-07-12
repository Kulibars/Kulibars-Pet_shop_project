const Categories = require("../models/Сategory");

async function getCategories() {
  const category = await Categories.find();
  return category;
}

async function editCategory(id, data) {
  if (data.name === "" || data.description === "") {
    throw new Error("заполните все поля");
  }

  return Categories.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
}

async function addCategory({ forAnimal, name, description }) {
  if (name === "" || description === "") {
    throw new Error("заполните все поля");
  }

  const newCategory = await Categories.create({
    for_animal: forAnimal,
    name,
    description,
  });

  return newCategory;
}

async function deleteCategory(id) {
  await Categories.deleteOne({ _id: id });
}

module.exports = {
  editCategory,
  getCategories,
  addCategory,
  deleteCategory,
};
