const express = require("express");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const mapProduct = require("../helpers/mapProduct");
const {
  getProducts,
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router({ mergeParams: true });

router.get("/products", async (req, res) => {
  try {
    const { products, lastPage } = await getProducts(
      req.query.searchPhrase,
      req.query.animal,
      req.query.category,
      req.query.minPrice || 0,
      req.query.maxPrice || Infinity,
      req.query.sortPriceOrder,
      req.query.limit,
      req.query.page
    );

    res.send({
      data: { lastPage, products: products.map(mapProduct) },
    });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post(
  "/products",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const newProduct = await addProduct(req.body);
      res.send({
        error: null,
        message: "продукт добавлен",
        data: mapProduct(newProduct),
      });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

router.get("/products/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.send({ error: null, data: mapProduct(product) });
  } catch (e) {
    res.send({ error: "Продукт не найден" });
  }
});

router.delete(
  "/products/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      await deleteProduct(req.params.id);
      res.send({ message: "продукт удален", error: null });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

router.patch(
  "/products/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const updatedProduct = await editProduct(req.params.id, {
        ...req.body,
        for_animal: req.body.forAnimal,
        image_url: req.body.imageUrl,
      });
      res.send({
        error: null,
        message: "продукт обновлен",
        data: mapProduct(updatedProduct),
      });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

module.exports = router;
