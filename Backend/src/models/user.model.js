const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: [true, "username already taken"],
        required: true,
    },

    email: {
        type: String,
        unique: [true, "Account already exists with this email address"],
        required: true,
    },

    password: {
        type: String,
        default: null
    },

    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },

    profilePicture: {
        type: String,
        default: ""
    },

    googleId: {
        type: String,
        default: null
    }

});

const userModel = mongoose.model("users", userSchema)

module.exports = userModel