const httpStatus = require('http-status');
const {User} = require('../models/users');
const userService = require('../services/users.services');
const {ApiError} = require('../middlewares/apiError');

const createUser = async (email,password)=>{
    try{
        if(await User.emailTaken(email))
        {
            // throw new Error('Email Already Taken');
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry Email already taken','Email already taken create user');
        }

        const user = new User({
            email:email,
            password:password
        });
        await user.save();
        return user;

    }catch(error){
        throw error;
    }
}

const genAuthToken = (user)=>{
    let token = user.generateAuthToken();
    return token;
}

const signinwithEmailandPassword = async (email,password)=>{
    try{
        //CHECKING EMAIL
        let user = await userService.findUserByEmail(email);
        if(!user){
            //  throw new Error('Bad Email');
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry Bad Email','bad email SIGNINWITHEMAILANDPASSWORD');
        }

        //VALIDATING PASSWORD
        if(!await user.comparePasswords(password)){
            // throw new Error('Bad Password');
            throw new ApiError(httpStatus.BAD_REQUEST,'Sorry Bad Password','BAD PASSWORD SIGNINWITHEMAILANDPASSWORD');
        }
        return user;
    }catch(error){
        throw error;
    }
}

module.exports = {createUser,
    genAuthToken,
    signinwithEmailandPassword
};