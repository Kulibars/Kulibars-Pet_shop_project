const express = require("express");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const mapReserved = require("../helpers/mapReserved");
const {
  addReserve,
  getReserves,
  getReserve,
  deleteReserve,
} = require("../controllers/reserved");

const router = express.Router({ mergeParams: true });

router.post("/reserved", async (req, res) => {
  try {
    await addReserve(req.body);
    res.send({ error: null, message: "Заказ оформлен!" });
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.get(
  "/reserved",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const reservedList = await getReserves();

      res.send({ data: reservedList.map(mapReserved) });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

router.get(
  "/reserved/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const reserve = await getReserve(req.params.id);

      res.send({ error: null, data: mapReserved(reserve) });
    } catch (e) {
      res.send({ error: "ничего не найдено" });
    }
  }
);

router.delete(
  "/reserved/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      await deleteReserve(req.params.id);
      res.send({ message: "резерв удален", error: null });
    } catch (e) {
      res.send({ error: e.message });
    }
  }
);

module.exports = router;
