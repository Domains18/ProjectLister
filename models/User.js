const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const CustomError = require('../config/errors/CustomError');


const ACCESS_TOKEN = {
    secret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    expiry: process.env.AUTH_ACCESS_TOKEN_EXPIRY,
};
const REFRESH_TOKEN = {
    secret: process.env.AUTH_REFRESH_TOKEN_EXPIRY,
    expiry: process.env.AUTH_ACCESS_TOKEN_EXPIRY,
};

const RESET_PASSWORD_TOKEN = {
    expiry: process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINS,
};

const User = mongoose.Schema;

const UserSchema = new User({
    firstName: { type: String, required: [true, "Provide first name"] },
    lastName: { type: String, required: [true, 'provide last name'] },
    email: { type: String, required: [true, "Email is required"], unique: true },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: { required: true, type: String }
        }
    ],
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
});

//schema options

UserSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret, options) {
        const { firstName, lastName, email } = ret;
        return { firstName, lastName, email }
    }
});


//attach middleware
UserSchema.pre("save", async (next) => {
    try {
        if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        next(error);
    }
});

//attach custom static mathods
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({ email });
    if (!user)
        throw new CustomError(
            "Wrong credentials!",
            400,
            "Email or password is wrong"
        );
    return user;
};

UserSchema.methods.generateAccessToken = function () {
    const user = this;
    //create a signed access token
    const accessToken = jwt.sign(
        {
            _id: user._id.toString(),
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email
        },
        ACCESS_TOKEN.secret,
        {
            expiresIn: ACCESS_TOKEN.expiry,
        }
    );
    return accessToken;
}

UserSchema.methods.generateRefreshToken = async function () {
    const user = this;

    //create a refresh token
    const refreshToken = jwt.sign(
        {
            _id: user.toString(),
        },
        REFRESH_TOKEN.secret,
        {
            expiresIn: REFRESH_TOKEN.expiry,
        }
    );
    //refresh token hash from refresh token
    const refreshTokenHash = crypto
        .createHmac("sha256", REFRESH_TOKEN.secret)
        .update(refreshToken)
        .digest("hex")
    //save the refresh token to the database
    user.tokens.push({ token: refreshTokenHash });
    await user.save();

    return refreshToken;
};



UserSchema.methods.generateResetToken = async function () {
    const resetTokenValue = crypto.randomBytes(20).toString("base64url");
    const resetTokenSecret = crypto.randomBytes(10).toString("hex");
    const user = this;

    const resetToken = `${resetTokenValue}=${resetTokenSecret}`;

    //create hash
    const resetTokenHash = crypto
        .createHmac("sha256", resetTokenS)
}
