const express = require('express');
const app = express();
const bodyParser = require('body-parser');  
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
const {xss} = require('express-xss-sanitizer');//MIDDLEWARE
const mongoSanitize = require('express-mongo-sanitize');//MIDDLEWARE
const {handleErrors, convertToApiError} = require('./middlewares/apiError');
const {jwtStrategy} = require('./middlewares/passport');
const passport = require('passport');


/////////////////////////////////////////////////CONNECTION////////////////////////////////////////////////////////////
mongoose.connect(mongoURI);
///////////////////////////////////////////////

app.use(bodyParser.json());
app.use(xss());
app.use(mongoSanitize()); 
//PASSPORT
app.use(passport.initialize());
passport.use('jwt',jwtStrategy);



//////////////////////////////////////////////////////Routes//////////////////////////////////////////////////////////////
const routes = require('./routes/index');
app.use('/api',routes);
app.use(convertToApiError);
app.use((error,req,res,next)=>{
    handleErrors(error,res); 
});

/////////////////////////




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Server is running on Port :" + port);
});