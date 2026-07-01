const otpModel = require("../models/otp.model");
const userModel = require("../models/user.model");
const generateOtp = require("../utils/otp");
const sendEmail = require("../services/mail.service");

async function sendOtpController(req, res) {

    try {

        const { purpose } = req.body;

        const email = (req.body.email || "").trim().toLowerCase();

        if (!email || !purpose) {

            return res.status(400).json({
                message: "Email and purpose are required."
            });

        }

        if (!["register", "reset"].includes(purpose)) {

            return res.status(400).json({
                message: "Invalid OTP purpose."
            });

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            return res.status(400).json({
                message: "Invalid email address."
            });

        }

        if (purpose === "register") {

            const existingUser = await userModel.findOne({ email });

            if (existingUser) {

                return res.status(409).json({
                    message: "Account already exists with this email."
                });

            }

        }

        if (purpose === "reset") {

            const existingUser = await userModel.findOne({ email });

            if (!existingUser) {

                return res.status(404).json({
                    message: "Account not found."
                });

            }

        }

        const { otp, expiresAt } = generateOtp();

        await otpModel.findOneAndDelete({
            email,
            purpose
        });

        await otpModel.create({

            email,

            otp,

            purpose,

            verified: false,

            expiresAt

        });

        const isRegister = purpose === "register";

        const emailSubject = isRegister
            ? "ProfileFit • Email Verification Code"
            : "ProfileFit • Password Reset Code";

        const heading = isRegister ?
            "✅ Verify Your Email" : "🔒 Reset Your Password";

        const description = isRegister
            ? "Welcome to <strong>ProfileFit</strong>. Use the verification code below to verify your email and complete your account registration."
            : "We received a request to reset your <strong>ProfileFit</strong> password. Use the verification code below to continue.";

        const badgeColor = isRegister
            ? "#4F46E5"
            : "#DC2626";

        const badgeBackground = isRegister
            ? "#EEF2FF"
            : "#FEF2F2";

        const footerMessage = isRegister
            ? "After verification you'll be able to create your account."
            : "After verification you'll be able to create a new password.";

        await sendEmail(

            email,

            emailSubject,

            `
            <!DOCTYPE html>
            <html>

            <head>
                <meta charset="UTF-8">
                    <title>ProfileFit Verification</title>
            </head>

            <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

                <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f4f7fb;">

                    <tr>

                        <td align="center">

                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 35px rgba(0,0,0,.08);">

                                <tr>

                                    <td style="background:linear-gradient(135deg,#6366F1,#8B5CF6);padding:32px;text-align:center;">

                                            <div style="display:inline-block;background:#ffffff;padding:14px 28px;border-radius:999px;font-size:26px;font-weight:700;color:#6366F1;letter-spacing:1px;">
                                                ProfileFit
                                            </div>

                                            <p style="margin:8px 0 0;color:#e8e8ff;font-size:15px;">
                                                ${isRegister ? "Complete Your Registration" : "Secure Password Reset"}
                                            </p>

                                    </td>

                                </tr>

                                <tr>

                                    <td style="padding:40px;">

                                        <h2 style="margin:0;color:#1e293b;font-size:24px;">
                                            ${heading}
                                        </h2>

                                        <p style="margin:18px 0;color:#64748b;font-size:16px;line-height:1.7;">
                                            ${description}
                                        </p>

                                        <div style="margin:35px 0;text-align:center;">

                                            <div style="display:inline-block;padding:18px 40px;border:1px solid ${badgeColor};border-radius:16px;background:${badgeBackground};box-shadow:0 8px 24px rgba(0,0,0,.08);">

                                                <p style="margin-bottom:18px;color:#64748b;font-size:15px;font-weight:600;">
                                                    ${isRegister ? "Registration Verification Code" : "Password Reset Verification Code"}
                                                </p>
                                                <span style="font-size:34px;font-weight:700;letter-spacing:12px;color:${badgeColor};">
                                                    ${otp}
                                                </span>

                                            </div>

                                        </div>

                                        <p style="margin:0;color:#475569;font-size:15px;">
                                            This verification code is valid for
                                            <strong>5 minutes</strong>.
                                        </p>

                                        <p style="margin-top:22px;color:#94a3b8;font-size:14px;line-height:1.7;">
                                            ${footerMessage}
                                        </p>

                                        <p style="margin-top:14px;color:#94a3b8;font-size:14px;line-height:1.7;">
                                            If you didn't request this email, you can safely ignore it.
                                            No changes will be made to your account.
                                        </p>

                                    </td>

                                </tr>

                                <tr>

                                    <td style="padding:26px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">

                                        <p style="margin:0;color:#64748b;font-size:13px;">
                                            If you have any questions, our support team is here to help.
                                        </p>

                                        <p style="margin-top:10px;color:#94a3b8;font-size:12px;">
                                            © ${new Date().getFullYear()} ProfileFit. All rights reserved.
                                        </p>

                                    </td>

                                </tr>

                            </table>

                        </td>

                    </tr>

                </table>

            </body>

        </html>
            `

        );

        return res.status(200).json({

            message: "OTP sent successfully."

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            message: error.message || "Internal Server Error"

        });

    }

}

async function verifyOtpController(req, res) {

    try {

        const { purpose } = req.body;

        if (!["register", "reset"].includes(purpose)) {

            return res.status(400).json({
                message: "Invalid OTP purpose."
            });

        }

        const email = (req.body.email || "").trim().toLowerCase();

        const otp = String(req.body.otp || "").trim();

        if (!email || !otp || !purpose) {

            return res.status(400).json({
                message: "Email, OTP and purpose are required."
            });

        }

        if (!/^\d{6}$/.test(otp)) {

            return res.status(400).json({
                message: "OTP must contain exactly 6 digits."
            });

        }

        const otpDoc = await otpModel.findOne({

            email,

            purpose

        });

        if (!otpDoc) {

            return res.status(400).json({
                message: "OTP not found."
            });

        }

        if (otpDoc.expiresAt < new Date()) {

            await otpModel.deleteOne({

                email,

                purpose

            });

            return res.status(400).json({
                message: "OTP expired."
            });

        }

        if (otpDoc.verified) {

            return res.status(400).json({
                message: "OTP already verified."
            });

        }

        if (String(otpDoc.otp) !== String(otp)) {

            return res.status(400).json({
                message: "Invalid OTP."
            });

        }

        otpDoc.verified = true;

        await otpDoc.save();

        return res.status(200).json({

            message: "OTP verified successfully."

        });

    }

    catch (error) {

        return res.status(500).json({

            message: error.message || "Internal Server Error"

        });

    }

}

module.exports = {
    sendOtpController,
    verifyOtpController
};