const ApiError = require("./api_err");

class InvalidPasswordError extends ApiError{
    constructor(){
        super(404, 'invalid password', 'E_WRONGPASSWORD');
    }
}

module.exports = InvalidPasswordError;