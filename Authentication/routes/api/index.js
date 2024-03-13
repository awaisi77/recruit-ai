const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const forgetPassword = require("./forget-password");
const resetPassword = require("./reset-password");

const loginWithGoogleApi = require("./loginWithGoogleApi");
const loginWithFacebookApi = require("./loginWithFacebookApi");
const loginWithGithubApi = require("./loginWithGithubApi");


const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(forgetPassword);
router.use(resetPassword);

//social auth
router.use(loginWithGoogleApi);
router.use(loginWithFacebookApi);
router.use(loginWithGithubApi);

module.exports = router;