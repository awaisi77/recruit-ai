
const express = require("express");
const UserService = require("../../services/UserService");
const router = express.Router();

const Datasources = require('../../datasources');
const db = Datasources.getDatabase();
const passport = require("passport");


router.post("/login", async function (req, res, next) {
    const payload = req.body;
    const user = new UserService(db)
    const response = await user.login(payload);
    res.send(response)
})



//testing route  - user authentication
router.get("/payment", passport.authenticate('jwt', { session: false }), async function (req, res, next) {
    res.send({ message: "your payment is 1200$" });
})


module.exports = router; 