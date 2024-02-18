//MIDDLEWARE THAT WE WILL USE IN OUR ROUTES...
//IT WILL USE PASSPORT IN ORDER TO GUARD OUR ROUTES...
const passport = require('passport');
const {ApiError} = require('./apiError');
const httpStatus = require('http-status');
const {roles} = require('../config/roles');

const verify = (req,res,resolve,reject,rights)=>async(error,user)=>{
    if(error || !user)
    {
        return reject(new ApiError(httpStatus.UNAUTHORIZED,'Sorry Unauthorised','this comes from REJECT by not founding or error'));
    }
    req.user = {
        _id:user._id,
        email:user.email,
        role:user.role,
        firstname:user.firstname,
        lastname:user.lastname,
        age:user.age,
        verified:user.verified
    };

    if(rights.length)
    {
        const action = rights[0];//action of the USER
        const resource = rights[1];//profiles articles
        const permission = roles.can(req.user.role)[action](resource);
        if(!permission.granted){
            return reject(new ApiError(httpStatus.FORBIDDEN,'Sorry You dont have enough Rights',"this comes from REJECT from Rights section"));
        }
        res.locals.permission = permission ;
    }
    
    resolve();


}


const auth = (...rights)=> async(req,res,next)=>{
    return new Promise((resolve,reject)=>{
        passport.authenticate('jwt',{session:false},verify(req,res,resolve,reject,rights))(req,res,next);

    })
    .then(()=>next())
    .catch((error)=> next(error))
  

}

module.exports = auth;