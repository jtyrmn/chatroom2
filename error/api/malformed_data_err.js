const ApiError = require("./api_err");

class MalformedDataError extends ApiError{
    constructor(){
        super(400, 'can not understand data', 'E_DATAINVALID');
    }
}

module.exports = MalformedDataError;