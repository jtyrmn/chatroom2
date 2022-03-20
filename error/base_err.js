//generic error masterclass for handling returning errors to client

class BaseError extends Error{
    constructor(status_code, description, error_code){
        super(description);
        this.status_code = status_code;
        //error_code used by client to determine error type
        this.error_code = error_code;
    }
}

module.exports = BaseError;