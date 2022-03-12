const assert = require('assert');
const BaseError = require('../base_err')

class ApiError extends BaseError{
    constructor(status_code, description, error_code){
        assert(status_code >= 400 && status_code < 500, 'api error code must be 4xx');

        super(status_code, description, error_code ? error_code : 'E_API');
    }
}

module.exports = ApiError;