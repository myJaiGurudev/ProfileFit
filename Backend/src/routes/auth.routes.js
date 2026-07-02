const { Router } = require('express')
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @description register a new user, expects username, email and then send otp to veify email then password in the request body
 * @access Public
 */
authRouter.post("/register", authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route POST /api/auth/reset-password
 * @description reset password for a user, expects email and then send otp to veify email then new password in the request body
 * @access Public
 */
authRouter.post("/reset-password", authController.resetPasswordController)

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout", authController.logoutUserController)

/**
 * @route POST /api/auth/google-login
 * @description login user with google account
 * @access Public
 */
authRouter.post("/google-login", authController.googleLoginController);

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-details", authMiddleware.authUser, authController.getMeController)


module.exports = authRouter