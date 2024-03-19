const express = require("express");
const UserService = require("../../services/UserService");
const router = express.Router();
const Datasources = require('../../datasources');
const passport = require("passport");
const db = Datasources.getDatabase();



router.get("/user", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = new UserService(db)
    const response = await user.getUserInfoById(userId);
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router; 