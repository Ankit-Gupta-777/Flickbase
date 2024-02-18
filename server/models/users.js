const mongoose = require('mongoose');
require('dotenv').config();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Invalid Email');
            }
        }

    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    firstname:{
        type:String,
        trim:true,
        maxlength:25
    },
    lastname:{
        type:String,
        trim:true,
        maxlength:25
    },
    age:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    },
    verified:{
        type:Boolean,
        default:false
    }
});
userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({email:email});
    return !!user;

}

userSchema.pre('save',async function(next){
    let user = this;
    if(user.isModified('password'))
    {
        const salt = await bcrypt.genSalt(10); 
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
    }
    next();
})

userSchema.methods.generateAuthToken = function(){ 
    let user = this;
    const userObj = {
        sub:user._id.toHexString(),
        email:user.email
    };
    const token = jwt.sign(userObj,process.env.DB_SECRET,{expiresIn:'1d'});

    return token;
}

userSchema.methods.comparePasswords = async function(candidatePassword){
     const user = this;
     const match =  await bcrypt.compare(candidatePassword,user.password);
     return match;   
}


//REGISTER TOKEN
userSchema.methods.generateRegisterToken = function(){
    let user = this;
    const userObj = {
        sub:user._id.toHexString()
    };
    const token = jwt.sign(userObj,process.env.DB_SECRET,{expiresIn:'10h'});

    return token;
}

const User = mongoose.model('User',userSchema);

module.exports = {User};