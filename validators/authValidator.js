const { body, param } = require('express-validator')
const User = require('../models/User');


module.exports.loginValidator = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage()
        .bail()
        .isEmail()
        .withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password cannot be empty")
];

module.exports.signUpValidator = [
    body("firstName").trim().notEmpty().withMessage("firstname cannot be empty"),
    body("lastname").trim().notEmpty().withMessage("lastname cannot be empty"),
    body('email')
        .trim()
        .notEmpty()
        .withMessage()
        .bail()
        .custom(async (email) => {
            //checking if email exists in database
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                throw new Error("Email already exists")
            }
        }),
    body("password")
        .notEmpty()
        .withMessage()
        .bail()
        .isEmail()
        .withMessage()
];


module.exports.forgotPasswordValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("email cannot be empty")
        .bail()
        .isEmail()
        .withMessage("invalid email")
];

module.exports.resetPasswordValidator = [
    param("resetToken")
        .notEmpty()
        .withMessage("Reset token missing"),
    body("password")
        .notEmpty()
        .withMessage("Password cannot be empty")
        .bail()
        .isLength({ min: 4 })
        .withMessage("password must be at least 4 characters long"),
    body("passwordConfirm")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("passwords do not match");
            }
            return true;
        })
    
];
