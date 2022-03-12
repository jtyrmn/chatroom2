const BaseError = require('./base_err')

class ServerError extends BaseError{
    constructor(){
        super(500, 'internal server error', 'E_INTERNAL');
    }
}

module.exports = ServerError;