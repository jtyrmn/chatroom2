const ApiError = require('./api_err')

class UnauthorizedUserError extends ApiError{
    constructor(){
        super(401, 'unauthorized user', 'E_UNAUTHORIZED');
    }
}

module.exports = UnauthorizedUserError;