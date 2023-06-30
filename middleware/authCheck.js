const jwt = require("jsonwebtoken");
const AuthorizationError = require("../config/errors/AuthorizationError")


const ACCESS_TOKEN = {
    secret : process.env.AUTH_ACCESS_TOKEN_SECRET,
};

module.exports.requireAuthentication = async (req, res, next) => {
    try {
        const authheader = req.header("Authorization");
        if (!authheader?.startsWith("Bearer"))
            throw new AuthorizationError(
                "Authntication Error",
                undefined,
                "You are anAuthenticated",
                {
                    error: "invalid_access_token",
                    error_description: "unknown authentication scheme",
                }
            );
        
        const accessTokenParts = authheader.split(" ");
        const atkn = accessTokenParts[1];

        const decoded = jwt.verify(atkn, ACCESS_TOKEN.secret);

        req.userId = decoded._id;
        req.token = atkn
        next();
    } catch (error) {
        //authentication failure
        throw new AuthorizationError("error authenticating user")

        const exParams = {
            error: "expired access Tokens",
            error_description: "access token is expired",
        };
        if (error.name === "TokenExpiredError")
            return next(
                new AuthorizationError(
                    "Authentication Error",
                    undefined,
                    "Token lifetime exceeded",
                    exParams
                )
            );
        next();
    }
}

