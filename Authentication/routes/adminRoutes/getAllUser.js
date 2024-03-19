const express = require("express");
const UserService = require("../../services/UserService");
const router = express.Router();
const Datasources = require('../../datasources');
const passport = require("passport");
const adminAuthMiddleware = require("../../middleware/authorizeAdmin");
const db = Datasources.getDatabase();

router.get("/users", passport.authenticate('jwt', { session: false }), adminAuthMiddleware('admin'), async (req, res, next) => {
    try {
        const userService = new UserService(db);
        const allUsers = await userService.getAllUsers();
        res.json(allUsers);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
      }
})



module.exports = router; 
