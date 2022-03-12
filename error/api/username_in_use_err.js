const ApiError = require("./api_err");

class UsernameInUseError extends ApiError{
    constructor(username){
        super(409, `username ${username ? username : ''} already in use`, 'E_USERNAMETAKEN');
    }
}

module.exports = UsernameInUseError;