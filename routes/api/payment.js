const express = require("express");
const router = express.Router();

router.get("/payment", async function (req, res, next) {hsb
    res.send({ status: true });
  });

  module.exports = router; 