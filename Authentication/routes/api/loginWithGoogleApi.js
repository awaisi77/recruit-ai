const express = require("express");
const passport = require("passport");
const router = express.Router();


const successLoginUrl = "http://localhost:4008/login/success";
const errorLoginUrl = "http://localhost:4008/login/error";

//auth with google
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }))


//auth with google
router.get("/google/redirect", passport.authenticate('google',
    {
        failureMessage: "cannot proceed with login",
        failureRedirect: errorLoginUrl,
        successRedirect: successLoginUrl
    }),
    (req, res) => {
        console.log(req.user)
        res.send("thank you for signing in");
 })


 module.exports = router; 