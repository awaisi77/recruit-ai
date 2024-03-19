const express = require("express");
const passport = require("passport");
const { isUserAuthenticated } = require("../../middleware/auth");
const router = express.Router();


const successLoginUrl = "http://localhost:4008/api/v1/login/success";
const errorLoginUrl = "http://localhost:4008/login/error";



// Auth with Facebook
router.get("/login/facebook", passport.authenticate('facebook',  { scope: ['public_profile', 'email'] }));

// Facebook redirect route
router.get("/auth/facebook/redirect", passport.authenticate('facebook', {
    failureMessage: "cannot proceed with facebook login",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl
}), (req, res) => {
    console.log(req.user);
    res.send("Thank you for signing in");
});

 router.get('/check', isUserAuthenticated, (req, res) => {
    res.send("welcome authorized user!!!")
 })

 router.get('/login/success', isUserAuthenticated, (req, res) => {
    res.send("login successfull!!!")
 })


 module.exports = router; 