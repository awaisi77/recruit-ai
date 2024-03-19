const express = require("express");
const passport = require("passport");
const { isUserAuthenticated } = require("../../middleware/auth");
const router = express.Router();


const successLoginUrl = "http://localhost:4008/api/v1/login/success";
const errorLoginUrl = "http://localhost:4008/login/error";


// Auth with Facebook
router.get("/login/github", passport.authenticate('github',  { scope: ['profile'] }));

// Facebook redirect route
router.get("/auth/github/redirect", passport.authenticate('github', {
    failureMessage: "cannot proceed with github login",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl
}), (req, res) => {
    console.log(req.user);
    res.send("Thank you for signing in");
});``


 router.get('/login/success', isUserAuthenticated, (req, res) => {
    res.send("login successfull!!!")
 })


 module.exports = router; 