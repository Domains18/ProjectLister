const jwt = require("jsonwebtoken");
const AuthorizationError = require("../config/errors/AuthorizationError")


const ACCESS_TOKEN = {
    secret = process.env.AUTH_ACCESS_TOKEN_SECRET,
};

module.exports.requireAuthentication = async (req, res, next) => {
    
}
