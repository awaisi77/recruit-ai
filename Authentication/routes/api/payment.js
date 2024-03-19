const express = require("express");
const adminAuthMiddleware = require("../../middleware/authorizeAdmin");
const router = express.Router();


router.get("/payment", adminAuthMiddleware('customer'), async (req, res, next) => {
    res.send({ status: true });
  });

  module.exports = router; 