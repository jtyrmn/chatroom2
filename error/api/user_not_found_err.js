const ApiError = require("./api_err");

class UserNotFoundError extends ApiError{
    constructor(username){
        super(404, `user ${username? username + ' ' : ''}not found`, 'E_USERNOTFOUND');
    }
}

module.exports = UserNotFoundError;