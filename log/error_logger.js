//middleware for catching and handling errors

const BaseError = require("../error/base_err");
const ServerError = require("../error/server_err");

function error_logger(error, req, res, next){
    if(error instanceof ServerError){ //dont bother with recording api errors, we only care about 5xx status errors in this case
        const d = new Date();

        //string to be logged
        let logged_str = `
    ${d.toISOString()}:~~~~~~~~~~~~~~~oh no~~~~~~~~~~~~~~~\n
            ${error.stack}\n
        from ${req.ip} accessing ${req.url}\n
        `;

        if(error.private_msg){
            logged_str += `error includes message:\n${error.private_msg}\n`
        }

        console.error(logged_str);
        //save to file here maybe
    }

    //return error to client
    if(error instanceof BaseError){
        res.status(error.status_code).json({
            err: error.error_code,
            msg: error.message
        });
    }else{ //in case some regular error slips in here
        res.status(500).json({
            err: 'E_UNKNOWN',
            msg: 'unknown error'
        });
    }
}

module.exports = error_logger;