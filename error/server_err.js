const BaseError = require('./base_err')

//for any errors that were a result of a bug on the server
class ServerError extends BaseError{
    constructor(private_msg){
        super(500, 'internal server error', 'E_INTERNAL');
        if(private_msg){
            //private_msg is the error message that we want to see when looking at logs but don't want to be sent to the user
            //can send in a string but I send in the whole error object in case I need it
            this.private_msg = private_msg;
        }
    }
}

module.exports = ServerError;