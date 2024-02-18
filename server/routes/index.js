const express = require('express');
const router = express.Router();
///////////////////////////////////////////

const authRoute = require('./auth.route');
const articlesRoute = require('./articles.route');
const usersRoute = require('./users.route');

const routesIndex = [
    {
        path:'/auth',
        route:authRoute
    },
    {
        path:'/users',
        route:usersRoute
    },
    {
        path:'/articles',
        route:articlesRoute
    }

];


routesIndex.forEach((route)=>{
    router.use(route.path,route.route); 
})



// router.use(path,file);

///////////////////////////////////////////
module.exports = router;