const express = require("express");
const UserService = require("../../services/user");
const { tryCatch } = require("bullmq");
const router = express.Router();



router.get("/test", async function (req, res, next) {
    res.send({ status: true });
});


router.post("/signup", async function (req, res, next) {

    try {
        const payload= req.body;
        console.log(req.body)
        const user = new UserService()
        const response = await user.signupService(payload);
        res.send(response)

    } catch (error) {
        console.log(error)
    }

})
module.exports = router; 