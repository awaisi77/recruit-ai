const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const loginWithGoogleApi = require("./loginWithGoogleApi");


const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(loginWithGoogleApi);

module.exports = router;