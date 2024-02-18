const {authServices,emailServices} = require('../services/index');
const httpStatus = require('http-status');

const authController = {
    async register(req,res,next){
        try{
            console.log(req.body);
           const email = req.body.email;
           const password = req.body.password;
           let user = await authServices.createUser(email,password);
           let token = await authServices.genAuthToken(user);
             //Send Verification Email
            await emailServices.registerEmail(email,user); 


           res.cookie('x-access-token',token).status(httpStatus.CREATED).send({
            user,
             token
           });
        }catch(error){  
        //    res.status(httpStatus.BAD_REQUEST).send(error.message);
            next(error);
        }
    },
    async signIn(req,res,next){
        try{
            const {email,password} = req.body;   
            let user = await authServices.signinwithEmailandPassword(email,password);
            let token = await authServices.genAuthToken(user);



            res.cookie('x-access-token',token).send({user,token});

        }catch(error){
            // res.status(httpStatus.BAD_REQUEST).send(error.message);
            next(error);
        }
    },
    async isauth(req,res,next){
        res.json(req.user);
    },
    async testrole(req,res,next){
        res.json({ok:'YES'});
    }
}
module.exports = authController;