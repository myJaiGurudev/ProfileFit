const express = require("express");

const router = express.Router();

const {
    sendOtpController,
    verifyOtpController
} = require("../controllers/otp.controller");

router.post("/send", sendOtpController);

router.post("/verify", verifyOtpController);

module.exports = router;