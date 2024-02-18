const mongoose = require('mongoose');
const httpStatus = require('http-status');

class ApiError extends Error{
    constructor(statusCode,message,source){
        super();
        console.log("ERROR COMES TO API ERROR");
        console.log(source);
        this.statusCode =statusCode; 
        this.message = message; 
    }
}


const handleErrors = (error,response)=>{
    console.log("ERROR COMES TO handleErrors Function");

    const statusCode = error.statusCode;
    const message = error.message;
    response.status(statusCode).json({
        status:'error',
        statusCode,
        message
    })
}

const convertToApiError = (err,req,res,next) =>{
    let error = err;
    if(!(error instanceof ApiError))
    {
        const statusCode = error.statusCode || error instanceof mongoose.Error 
        ?
        httpStatus.BAD_REQUEST
        :
        httpStatus.INTERNAL_SERVER_ERROR ;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode,message,'FROM CONVERT TO API ERROR');
    }
    next(error);
}

module.exports = {
    handleErrors,
    ApiError,
    convertToApiError
}