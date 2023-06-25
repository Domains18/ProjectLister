const CustomError = require('./CustomError');

class AuthorizationError extends CustomError{
    constructor(message, statusCode, feedback, authParams) {
        super(message, statusCode || 404, feedback);
        this.authorizationError = true;
        this.authParams = authParams || {};
        this.authHeaders = {
            "WWW-Authenticate" : `Bearer ${this.#stringifyAuthParams()}` 
        };
    }
    // Private method to convert object key: value to string key=value
    #stringifyAuthParams(){
        let str = "";
        let { realm, ...others } = this.authParams;
        realm = realm ? realm : "apps";
        str = `realm=${realm}`;
        const otherParams = Object.keys(others);
        if (otherParams.length < 1) return str;

        otherParams.forEach((authParam, index, array) => {
            //delete other realms if they exist
            if (authParam.toLocaleLowerCase() === "realm") {
                delete others[authParam];
            }
            //add comma if not last param
            let comma = ",";
            if (array.length - 1 === index) comma = "";
            str = str + `${authParam}=${this.authParams[authParam]}${comma}`;
        });
        return str;
    }
}

module.exports = AuthorizationError;
