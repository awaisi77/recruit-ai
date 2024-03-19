const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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
    }),
    (req, res, next) => {
        try {
            console.log("here we got req user", req.user)
            const existingUser = req.user;
            if (existingUser) {
                const jwtToken = jwt.sign(
                    { id: existingUser.id, email: existingUser.email },
                    process.env.JWT_SECRET
                );
                const response = {
                    status: "success",
                    statusCode: 200,
                    message: "Authentication successful",
                    payload: { token: jwtToken }
                };

                // Send response
                res.status(200).json(response);
            } else {
                const response = {
                    status: "error",
                    statusCode: 401,
                    message: "User not found",
                    payload: null
                };
                res.status(401).json(response);
            }
        } catch (error) {
            const response = {
                status: "error",
                statusCode: 500,
                message: "Internal server error",
                payload: null
            };
            res.status(500).json(response);
        }
})

router.get('/login/success', isUserAuthenticated, (req, res) => {
    res.send("login successfull!!!")
})

router.get("/payment", isUserAuthenticated, async (req, res, next) => {
    res.send({ status: true });
});

module.exports = router; 