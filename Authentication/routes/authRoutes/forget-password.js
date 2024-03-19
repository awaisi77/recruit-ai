// userRoutes.js
const express = require("express");
const UserService = require("../../services/UserService");
const router = express.Router();
const Datasources = require('../../datasources');
const db = Datasources.getDatabase();


router.post("/forget-password", async function (req, res, next) {
    const payload = req.body;
    const user = new UserService(db);
    const response = await user.forgetPassword(payload.email);
    res.send(response);
});

module.exports = router;
