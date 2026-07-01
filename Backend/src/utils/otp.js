function generateOtp() {

    return {
        otp: Math.floor(100000 + Math.random() * 900000).toString(),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    };

}

module.exports = generateOtp;