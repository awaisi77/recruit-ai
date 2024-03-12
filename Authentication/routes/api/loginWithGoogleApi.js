const express = require("express");
const passport = require("passport");
const { isUserAuthenticated } = require("../../middleware/auth");
const router = express.Router();


const successLoginUrl = "http://localhost:4008/api/v1/login/success";
const errorLoginUrl = "http://localhost:4008/login/error";

//auth with google
router.get("/login/google", passport.authenticate('google', { scope: ['profile', 'email'] }))


//auth with google
router.get("/auth/google/redirect", passport.authenticate('google',
    {
        failureMessage: "cannot proceed with login",
        failureRedirect: errorLoginUrl,
        successRedirect: successLoginUrl
    }),
    (req, res) => {
        console.log(req.user)
        res.send("thank you for signing in");
 })

 router.get('/check', isUserAuthenticated, (req, res) => {
    res.send("welcome authorized user!!!")
 })

 router.get('/login/success', isUserAuthenticated, (req, res) => {
    res.send("login successfull!!!")
 })


 module.exports = router; 