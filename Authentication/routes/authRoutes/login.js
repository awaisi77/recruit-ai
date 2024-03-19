
const express = require("express");
const UserService = require("../../services/UserService");
const router = express.Router();

const Datasources = require('../../datasources');
const db = Datasources.getDatabase();
const passport = require("passport");
const adminAuthMiddleware = require("../../middleware/authorizeAdmin");
const { isUserAuthenticated } = require("../../middleware/auth");


router.post("/login", async function (req, res, next) {
    const payload = req.body;
    const user = new UserService(db)
    const response = await user.login(payload);
    res.send(response)
})

// router.get("/payment",passport.authenticate('jwt', { session: false }), adminAuthMiddleware('customer'), async (req, res, next) => {
//     res.send({ status: true });
//   });



module.exports = router; 