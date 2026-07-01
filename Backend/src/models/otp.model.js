const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    otp: {
        type: String,
        required: true
    },

    purpose: {
        type: String,
        enum: ["register", "reset"],
        required: true
    },

    verified: {
        type: Boolean,
        default: false
    },

    expiresAt: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
});

otpSchema.index(
    {
        email: 1,
        purpose: 1
    },
    {
        unique: true
    }
);

module.exports = mongoose.model("Otp", otpSchema);