const httpStatus = require('http-status');
const {ApiError} = require('../middlewares/apiError');
const userServices = require('../services/users.services');
const  authServices  = require('../services/auth.services');
const emailServices = require('../services/email.services');
const mongoose = require('mongoose');
const express = require('express');



const userController = {
    async profile(req,res,next){
        try{
            const user = await userServices.findUserById(req.user._id);
            if(!user)
            {
                throw new ApiError(httpStatus.NOT_FOUND,'User not Found','user not found INSIDE PROFILE METHOD');
            }
            // res.json(res.locals.permission.filter(user._doc));
            res.json(user); 

        }catch(error){
            next(error);
        }
    },
    async updateProfile(req,res,next){
        try{
                const user = await userServices.updateUserProfile(req);
                res.json(res.locals.permission.filter(user._doc));

        }catch(error){
            next(error);
        }

    },
    async updateUserEmail(req,res,next){
        try{
            //create Service
            const user = await userServices.updateEmail(req);
           
            //generate Token
            const token = await authServices.genAuthToken(user); 

            //Sending Email
            // await emailServices.registerEmail(req.body.newemail,user);
            await emailServices.registerEmail(user.email,user);


            //Sending Response
            res.cookie('x-access-token',token).send({user:res.locals.permission.filter(user._doc),token});

        } catch(error){
            // throw new ApiError(httpStatus.NOT_FOUND,'Sorry NOT FOUND');
            console.log(" CATCH Error in updateUserEmail USER CONTROLLER ");
            next(error);
            // throw error;
        }
    },
    async verifyAccount(req,res,next){
        try{

            //?validation=faskdfnjdsjnfjndfjjngsddfasdfdsfdsfsdgfsggfefgvtrgtbhn(Token)   WE WILL HAVE TO CATCH THIS QUERY STRING

            const token =  userServices.validateToken(req.query.validation);    
            const user = await userServices.findUserById(token.sub);

            if(!user)
            {
                console.log(" Error in verifyAccount USER CONTROLLER  user not found");
                throw new ApiError(httpStatus.NOT_FOUND,"Sorry User Not Found","user Not Found usersController verify ACCOUNT");

            }
            if(user.verified) 
            {
                console.log("  Error in verifyAccount USER CONTROLLER  user already verified");
                throw new ApiError(httpStatus.NOT_FOUND,"Already Verified",'User Already Verified','comes from already verified from users controller verify ACCOUNT');
            }

            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED).send({
                email:user.email,
                verified:true
            });
          

        } catch(error){
        //   throw error;
        console.log(" CATCH Error in verifyAccount USER CONTROLLER");
            // throw error;
        next(error);
        }

    }




}
module.exports = userController; 
