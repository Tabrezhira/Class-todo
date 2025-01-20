const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    mobileno: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    createdAT: {
        type: Date,
        default: Date.now,
    },
    otp: {
        type: Number,
        maxlength: 4,
        default: null,  // OTP is null by default
    },
    // otpCreatedAt: {
    //     type: Date,
    //     default: Date.now,  // Time when OTP is created
    //     expires: '10s',  // OTP expires after 10 seconds
    // }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
