const mongoose = require("mongoose");
require("dotenv").config()
const BlacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: process.env.JWT_EXPIRATION_TIME, // Set expiration time based on your requirements
    },
});

const BlacklistedTokenModel = mongoose.model("BlacklistedToken", BlacklistedTokenSchema);

module.exports = BlacklistedTokenModel;
