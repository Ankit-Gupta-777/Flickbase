const httpStatus = require('http-status');
const {User} = require('../models/users');
const {ApiError}  = require('../middlewares/apiError');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const findUserByEmail = async(email)=>{
    return await User.findOne({email:email});

};

const findUserById = async (_id)=>{
    return await User.findById(_id);

};
const updateUserProfile = async(req)=>{
    try{
        const user = await User.findOneAndUpdate(
            {_id:req.user._id},
            {"$set":{
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                age:req.body.age
            }},
            {new:true}
        );

        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND,"Sorry User Not Found",'from update user PROFILE  USER NOT FOUND');
            // console.log("User Not Founf in UpdateUserProfile");
        }

        return user;

    }catch(error){
        throw new ApiError(httpStatus.NOT_IMPLEMENTED,"Sorry Not Updated",'from CATCH BLOCK of update user PROFILE ');
    }

};

const updateEmail = async (req)=>{
    try{
        if(await User.emailTaken(req.body.newemail)){
            console.log(" Error in updateUserEmail USER SERVICES email already taken ");
            
            throw new ApiError(httpStatus.NOT_IMPLEMENTED,"Sorry Email Already Taken",'Email Already Taken update user EMAIL ');
          
        }
        const user = await User.findOneAndUpdate(
            {_id:req.user._id,email:req.user.email},
            {"$set":{
                email:req.body.newemail,
                verified:false
            }},
            {new:true}
        );
        
        if(!user){
            console.log("User Not Found in UpdateUserEmail USER SERVICES");
            throw new ApiError(httpStatus.NOT_FOUND,"Sorry User with the Original Email, Not Found",'User not found for email updation');
        }

        return user;

    } catch(error){
        // throw new ApiError(httpStatus.NOT_ACCEPTABLE,"Sorry");
        console.log("Catch Error in updateEmail USER SERVICES ");
        throw error;
      
        // next(error);
    }

}
const validateToken = (token)=>{
    return jwt.verify(token,process.env.DB_SECRET);
}

module.exports = {
    findUserByEmail,
    findUserById,
    updateUserProfile,
    updateEmail,
    validateToken
};