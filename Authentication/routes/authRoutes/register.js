
const express = require("express");
const UserService = require("../../services/UserService");
const router = express.Router();

const bcrypt = require('bcryptjs');
const Datasources = require('../../datasources');
const db = Datasources.getDatabase();


router.post("/register", async function (req, res, next) {
    let payload = req.body;
    const user = new UserService(db)
    const response = await user.register(payload);
    res.json(response)
})


module.exports = router; 