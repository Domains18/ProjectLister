const { validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")
const crypto = require('crypto')

const User = require('../models/User');
const { sendEmail } = require("../services/sender.service");
const CustomError = require('../config/errors/CustomError');
const AuthorizationError = require("../config/errors/AuthorizationError");


const REFRESH_TOKEN = {
    secret: process.env.AUTH_REFRESH_TOKEN_SECRET,
    cookie: {
        name: 'refreshTkn',
        options: {
            sameSite: "None",
            secure: true,
            httpOnly: false,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }
    }
};

const REFRESH_PASSWORD_TOKEN = {
    expiry: process.env.RESET_PASSWORD_TOKEN_EXPIRY_MINS,
};

module.exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError(errors.array(), 422, errors.array()[0]?.msg);
        }
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const atkn = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        res.cookie(
            REFRESH_TOKEN.cookie.name,
            refreshToken,
            REFRESH_TOKEN.cookie.options
        );

        res.json({
            success: true,
            user,
            accessToken: atkn
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new CustomError(errors.array(), 422, errors.array()[0]?.msg);
        }
        const { firstName, lastName, email, password } = req.body;

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();
        const aTkn = await newUser.generateAccessToken();
        const refreshToken = await newUser.generateRefreshToken();
        res.cookie(
            REFRESH_TOKEN.cookie.name,
            refreshToken,
            REFRESH_TOKEN.cookie.options
        );

        res.status(201).json({
            success: true,
            user: newUser,
            accessToken: aTkn,
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports.logout = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        const cookies = req.cookies;
        const refreshToken = cookies[REFRESH_TOKEN.cookie.name];
        const rTknHash = crypto
            .createHmac("sha256", REFRESH_TOKEN.name)
            .update(refreshToken)
            .digetst("hex")
        user.tokens = user.tokens.filter((tokenObj) => tokenObj.token !== rTknHash);
        await user.save();

        const expireCookies = Object.assign(
            {},
            REFRESH_TOKEN.cookie.options,
            { expires: new Date(1) }
        );

        res.cookie(REFRESH_TOKEN.cookie.name, "", expireCookies);
        res.json(205).json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.refreshAccessToken = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const refreshToken = cookies[REFRESH_TOKEN.cookie.name];
        if (!refreshToken) {
            throw new AuthorizationError("Unauthorized"),
            undefined
        }
    } catch (error) {
        
    }
}
