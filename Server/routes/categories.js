const express = require("express");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const mapCategories = require("../helpers/mapCategories");
const authenticated = require("../middlewares/authenticated");
const {
  editCategory,
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/category");

const router = express.Router({ mergeParams: true });

router.get("/categories", async (req, res) => {
  try {
    const categories = await getCategories();
    res.send({ data: categories.map((item) => mapCategories(item)) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.post(
  "/categories",
  authenticated,
  hasRole([ROLES.ADMIN]),

  async (req, res) => {
    try {
      const newCategory = await addCategory(req.body);
      res.send({
        error: null,
        message: "новая категория добавлена",
        data: mapCategories(newCategory),
      });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

router.delete(
  "/categories/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),

  async (req, res) => {
    try {
      await deleteCategory(req.params.id);
      res.send({ error: null, message: "категория удалена" });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

router.patch(
  "/categories/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const updatedCategories = await editCategory(req.params.id, {
        ...req.body,
        for_animal: req.body.forAnimal,
      });
      res.send({
        error: null,
        message: "категория обновлена",
        data: mapCategories(updatedCategories),
      });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

module.exports = router;
