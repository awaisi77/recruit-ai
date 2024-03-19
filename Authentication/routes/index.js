const express = require("express");

//social api
const loginWithGoogleApi = require("./socialRoutes/loginWithGoogleApi");
const loginWithFacebookApi = require("./socialRoutes/loginWithFacebookApi");
const loginWithGithubApi = require("./socialRoutes/loginWithGithubApi");

//auth api
const registerApi = require("./authRoutes/register");
const loginApi = require("./authRoutes/login");
const forgetPassword = require("./authRoutes/forget-password");
const resetPassword = require("./authRoutes/reset-password");

//user api
const myProfile = require('./userRoutes/myProfile')

//admin api
const getAllUsers = require("./adminRoutes/getAllUser");


const router = express.Router();




//social auth
router.use(loginWithGoogleApi);
router.use(loginWithFacebookApi);
router.use(loginWithGithubApi);

//auth routes
router.use(registerApi);
router.use(loginApi);
router.use(forgetPassword);
router.use(resetPassword);

//user routes
router.use(myProfile);

//admin routes
router.use(getAllUsers);





module.exports = router;