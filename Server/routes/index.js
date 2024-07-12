const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/", require("./products"));
router.use("/", require("./categories"));
router.use("/", require("./reserved"));

module.exports = router;
