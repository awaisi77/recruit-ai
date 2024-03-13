// userRoutes.js
const express = require("express");
const UserService = require("../../services/UserService");
const router = express.Router();
const Datasources = require('../../datasources');
const db = Datasources.getDatabase();


// userRoutes.js
router.put("/reset-password/:token", async function (req, res, next) {
    const { newPassword } = req.body;
    const { token } = req.params;

    const user = new UserService(db);
    console.log("flag 1", token, newPassword)

    const response = await user.resetPassword(token, newPassword);
    res.send(response);
});

module.exports = router;
