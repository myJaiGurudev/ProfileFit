const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const otpModel = require("../models/otp.model")
const { OAuth2Client } = require("google-auth-library")

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

/**
 * @name registerUserController
 * @description register a new user, expects username, email and verify email by otp then ask password in the request body
 * @access Public
 */
async function registerUserController(req, res) {

    try {

        const username = req.body.username?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const password = req.body.password;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email and password"
            });
        }

        const otpDoc = await otpModel.findOne({
            email,
            purpose: "register"
        });

        if (!otpDoc || !otpDoc.verified) {
            return res.status(400).json({
                message: "Please verify your email first."
            });
        }

        const existingEmail = await userModel.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }

        const existingUsername = await userModel.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                message: "Username is already taken."
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        await otpModel.deleteOne({ email });

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture || ""
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}

/**
 * @name resetPasswordController
 * @description reset password for a user, expects email and then send otp to veify email then new password in the request body
 * @access Public
 */
async function resetPasswordController(req, res) {

    try {

        const email = req.body.email?.trim().toLowerCase();
        const newPassword = req.body.newPassword;

        if (!email) {
            return res.status(400).json({
                message: "Please provide email!"
            });
        }
        if (!newPassword) {
            return res.status(400).json({
                message: "Please provide new password!"
            });
        }

        const otpDoc = await otpModel.findOne({
            email,
            purpose: "reset"
        });

        if (!otpDoc || !otpDoc.verified) {
            return res.status(400).json({
                message: "Please verify your email first."
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email"
            });
        }

        const hash = await bcrypt.hash(newPassword, 10);

        user.password = hash;

        await user.save();

        await otpModel.deleteOne({ email });

        res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

}


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {

    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password"
        });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    if (user.authProvider === "google") {
        return res.status(400).json({
            message: "This account uses Google Sign-In."
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "User loggedIn successfully.",
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture || ""
        }
    });
}

/**
 * @name googleLoginController
 * @description login user with google account
 * @access Public
 */
async function googleLoginController(req, res) {

    try {

        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                message: "Google token is required."
            });
        }

        const ticket = await client.verifyIdToken({

            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID

        });

        const payload = ticket.getPayload();

        console.log(payload);

        if (!payload.email) {

            return res.status(400).json({
                message: "Google account email not found."
            });

        }

        if (!payload.email_verified) {

            return res.status(400).json({
                message: "Google email is not verified."
            });

        }

        const email = payload.email.trim().toLowerCase();

        let user = await userModel.findOne({ email });

        if (!user) {

            let username = (payload.name || "")
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase();

            if (!username) {
                username = email.split("@")[0];
            }

            let tempUsername = username;
            let count = 1;

            while (await userModel.findOne({ username: tempUsername })) {

                tempUsername = `${username}${count}`;
                count++;

            }

            user = await userModel.create({

                username: tempUsername,
                email,
                authProvider: "google",
                profilePicture: payload.picture || "",
                googleId: payload.sub,
                password: null

            });

        } else {

            user.authProvider = "google";
            user.googleId = payload.sub;
            user.profilePicture = payload.picture || user.profilePicture;

            await user.save();

        }

        const jwtToken = jwt.sign(

            {
                id: user._id,
                username: user.username
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Google login successful.",
            token: jwtToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(401).json({

            message: error.message || "Invalid Google token."

        });

    }

}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture || ""
        }
    });

}



module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    resetPasswordController,
    googleLoginController
}